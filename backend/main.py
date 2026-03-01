from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel
from dotenv import load_dotenv
import os 
import httpx
import anthropic
import json

load_dotenv()
app = FastAPI()

MOOD_TO_TYPES = {
    "Adventurous": [ "park", "hiking_area", "camping_cabin", "go_karting_venue"],
    "Relaxed": ["cafe", "spa", "library", "garden", "book_store"],
    "Social": ["Mall", "restaurant", "bar", "bowling_alley", "comedy_club", "food_court"],
    "Creative": ["art_gallery", "museum", "sculpture_garden", "performing_arts_theater", "university"],
    "Romantic": ["restaurant", "wine_bar", "jazz_club", "aquarium", "botanical_garden"],
    "Active": ["gym", "swimming_pool", "tennis_court", "sports_complex", "yoga_studio"],
}
class UserPreferences(BaseModel):
    location: str
    mood : str
    group_type: str
    indoor_outdoor : str
    budget : int 
    time_available : float
    radius: int


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/recommendations") 
async def get_recommendations(preferences: UserPreferences):
    

    activity_types = MOOD_TO_TYPES.get(preferences.mood, ["restaurant", "park", "cafe"])

    places = await search_nearby_places(
        location=preferences.location,
        activity_types=activity_types,
        radius=preferences.radius
    )
    recommendations = []
    for i, place in enumerate(places):
        if place["open_now"] is not False:
            recommendations.append({
                "rank": i + 1,
                "name": place["name"],
                "address": place["address"],
                "rating": place["rating"],
                "open_now": place["open_now"],
                "price_level": place["price_level"],
                "explanation": f"Stub explanation for {preferences.mood} mood",
                "match_score": 0,
            })
    # print(len(recommendations))
    recommendations = rank_with_claude(recommendations, preferences)
    return {"recommendations": recommendations}

@app.get("/health")
async def health():
    return{"status" : "ok"}

async def search_nearby_places(location : str, activity_types: list[str], radius: int) -> list[dict]: 
    api_key = os.getenv("GOOGLE_PLACES_API_KEY")

    url = "https://places.googleapis.com/v1/places:searchNearby"

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.currentOpeningHours,places.types,places.priceLevel"
    }

    body = {
        "includedTypes": activity_types,
        "maxResultCount": 10,
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": 49.2827,   # hardcoded Vancouver for now
                    "longitude": -123.1207
                },
                "radius": radius  # 2km radius
            }
        }
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=body, headers=headers)
        data = response.json()

    places = []
    for place in data.get("places", []):
        places.append({
            "name": place["displayName"]["text"],
            "address": place.get("formattedAddress", "Address unavailable"),
            "rating": place.get("rating", "No rating"),
            "open_now": place.get("currentOpeningHours", {}).get("openNow", "Unknown"),
            "hours": place.get("currentOpeningHours", {}).get("weekdayDescriptions", []),
            "types": place.get("types", []),
            "price_level": place.get("priceLevel", "Unknown"),
        })
    return places



def rank_with_claude(places: list[dict], preferences: UserPreferences) -> list[dict]: 

    places_text = ""
    for i, place in enumerate(places):
            places_text += f"""
            {i+1}. {place['name']}
            Address: {place['address']}
            Rating: {place['rating']}
            Open Now: {place['open_now']}
            Price Level: {place['price_level']}
        """

    prompt = f"""
    You are a local activity recommender helping someone find the perfect activity right now.

    Here are the user's preferences:
    - Mood: {preferences.mood}
    - Group type: {preferences.group_type}
    - Budget: ${preferences.budget} per person
    - Time available: {preferences.time_available} hours
    - Preference: {preferences.indoor_outdoor}

    Here are the available activities near them right now:
    {places_text}

    Your job:
    1. Rank the top 5 activities from the list by how well they fit this specific user
    2. Give each a match score out of 100
    3. Write a 2 sentence explanation for each that references their specific mood, budget, and time — be concrete, not generic

    Rules:
    - Never recommend something that would exceed their budget
    - Never recommend something that takes longer than their time available
    - If they want outdoor, prioritize outdoor activities
    - If open_now is Unknown, mention they should verify hours before going
    - Be specific — mention the actual place name and why it fits THEIR constraints

    Return your response as a JSON array with this exact format:
    [
    {{
        "rank": 1,
        "name": "place name exactly as given",
        "match_score": 95,
        "explanation": "your 2 sentence explanation here"
    }}
    ]

    Return only the JSON array, no other text.
    """

    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    response_text = message.content[0].text

    print(message.content)

        # Strip markdown code fences if Claude added them
    response_text = response_text.strip()
    if response_text.startswith("```"):
        response_text = response_text.split("\n", 1)[1]  # remove first line
    if response_text.endswith("```"):
        response_text = response_text.rsplit("\n", 1)[0]  # remove last line
    response_text = response_text.strip()
    ranked = json.loads(response_text)
    return ranked
