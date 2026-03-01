from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel
from dotenv import load_dotenv
import os 
import httpx

load_dotenv()
app = FastAPI()

MOOD_TO_TYPES = {
    "Adventurous": ["park", "hiking_area", "camping_cabin", "adventure_sports_center", "climbing_gym"],
    "Relaxed": ["cafe", "spa", "library", "garden", "book_store"],
    "Social": ["Mall, restaurant", "bar", "bowling_alley", "comedy_club", "food_court"],
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
        activity_types=activity_types
    )
    recommendations = []
    for i, place in enumerate(places):
        recommendations.append({
            "rank": i + 1,
            "name": place["name"],
            "address": place["address"],
            "rating": place["rating"],
            "open_now": place["open_now"],
            "explanation": f"Stub explanation for {preferences.mood} mood",
            "match_score": 0,
        })
    return {"recommendations": recommendations}

@app.get("/health")
async def health():
    return{"status" : "ok"}

async def search_nearby_places(location : str, activity_types: list[str]) -> list[dict]: 
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
                "radius": 2000  # 2km radius
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

