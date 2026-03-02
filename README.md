# Gather

**AI-powered activity recommendations for you and your group — based on your mood, budget, and time.**


🌐 **Live at [gatherapp.live](https://gatherapp.live)**

---

**DEMO https://github.com/user-attachments/assets/f60fc8bb-f62e-4fed-868f-0c3664de9061

## What It Does

Tell Gather your mood, who you're with, how much time you have, and your budget. Gather searches real nearby places using Google Places and uses Claude AI to rank and explain the best options for you — right now.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, deployed on Vercel |
| Backend | FastAPI (Python), deployed on AWS EC2 |
| Web Server | Nginx as reverse proxy |
| Process Manager | systemd |
| Places Data | Google Places API (New) — Nearby Search |
| Geocoding | Google Geocoding API |
| AI Ranking | Anthropic Claude API (claude-sonnet-4-6) |
| Domain & SSL | gatherapp.live via Namecheap, HTTPS via Certbot |

---

## How It Works

```
User fills out form (mood, budget, time, location, group type)
        ↓
Browser geolocation OR Google Geocoding API → coordinates
        ↓
Google Places Nearby Search API → real places near the user
        ↓
Claude API → ranks top 10 places with match scores + explanations
        ↓
Results displayed with Google Maps links
```

### RAG Pipeline

This app uses a Retrieval-Augmented Generation pattern:
- **Retrieval** — Google Places API fetches real, current nearby places based on mood-to-place-type mapping
- **Augmentation** — live place data (name, address, rating, hours, price level) is injected into the Claude prompt
- **Generation** — Claude ranks and explains recommendations grounded in actual place data, not general knowledge

---

## Mood to Place Type Mapping

Each mood maps to specific Google Place types for targeted search:

```python
MOOD_TO_TYPES = {
    "Adventurous": ["zoo", "park", "hiking_area", "go_karting_venue"],
    "Relaxed":     ["cafe", "spa", "movie_theater", "book_store", "museum"],
    "Social":      ["restaurant", "bar", "bowling_alley", "shopping_mall", "night_club"],
    "Hungry":      ["fast_food_restaurant", "restaurant", "food_court"],
    "Romantic":    ["art_gallery", "restaurant", "aquarium", "botanical_garden", "miniature_golf_course"],
    "Active":      ["gym", "swimming_pool", "tennis_court", "park"],
}
```

---

## Architecture

```
gatherapp.live          → Vercel (React frontend)
api.gatherapp.live      → AWS EC2 t3.micro (FastAPI backend)
                           └── Nginx (port 80/443)
                               └── uvicorn (port 8000)
                                   └── FastAPI app
                                       ├── Google Places API
                                       ├── Google Geocoding API
                                       └── Anthropic Claude API
```

---

## Running Locally

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file:

```
GOOGLE_PLACES_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
```

Start the server:

```bash
uvicorn main:app --reload
```

API runs at `http://localhost:8000`. Docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend/gather-frontend
npm install
npm start
```

App runs at `http://localhost:3000`.

> Make sure the fetch URL in `App.js` points to `http://localhost:8000` for local development.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/recommendations` | Get ranked activity recommendations |
| GET | `/health` | Health check |

### Request Body

```json
{
  "location": "Vancouver, BC",
  "latitude": 49.2827,
  "longitude": -123.1207,
  "mood": "Relaxed",
  "group_type": "Friends",
  "indoor_outdoor": "Indoor",
  "budget": 30,
  "time_available": 2.0,
  "radius": 5000
}
```

### Response

```json
{
  "recommendations": [
    {
      "rank": 1,
      "name": "Breka Bakery & Café",
      "match_score": 92,
      "explanation": "This highly-rated café is open right now...",
      "open_now": true,
      "rating": 4.4
    }
  ]
}
```

---

## Deployment

- **Backend** — AWS EC2 `t3.micro` (Ubuntu 24.04), managed by systemd, proxied by Nginx
- **Frontend** — Vercel, auto-deploys on push to `main`
- **SSL** — Let's Encrypt via Certbot, auto-renews

---

## Environment Variables

| Variable | Description |
|---|---|
| `GOOGLE_PLACES_API_KEY` | Google Cloud API key with Places + Geocoding enabled |
| `ANTHROPIC_API_KEY` | Anthropic API key |

---

## Built By

**Sayyam Singla** — Third year Computer Engineering, UBC  
[gatherapp.live](https://gatherapp.live)
