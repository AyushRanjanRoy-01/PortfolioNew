# News API Setup Guide

## Overview
The Tech Pulse page now fetches real tech news from **NewsAPI.org** - a free news aggregation API.

---

## Getting Your Free API Key

1. **Visit**: https://newsapi.org/
2. **Sign up** for a free account
3. **Get your API key** from the dashboard
4. **Free tier includes**: 100 requests per day, perfect for development

---

## Setup Instructions

### 1. Add API Key to Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cd frontend
touch .env
```

Add your API key:

```env
REACT_APP_NEWS_API_KEY=your_api_key_here
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 2. Restart Development Server

```bash
npm start
```

---

## Features

### ✅ **Real-time Tech News**
- Fetches latest headlines from NewsAPI.org
- Categories: Technology, Business, Science, Health
- 20 articles per category
- Automatic updates when switching categories

### ✅ **Fallback Demo Mode**
- If API key is missing or invalid, shows demo news
- Graceful error handling with user-friendly messages
- No crashes, always displays content

### ✅ **Rich Article Display**
- Article images (when available)
- Headlines and summaries
- Source attribution
- Publication dates
- External links to full articles

---

## API Details

**Endpoint**: `https://newsapi.org/v2/top-headlines`

**Parameters**:
- `category`: technology, business, science, health
- `country`: us
- `pageSize`: 20
- `apiKey`: Your API key

**Response Format**:
```json
{
  "status": "ok",
  "articles": [
    {
      "title": "Article headline",
      "description": "Article summary",
      "url": "https://...",
      "urlToImage": "https://...",
      "publishedAt": "2024-01-01T00:00:00Z",
      "source": {
        "name": "Source Name"
      }
    }
  ]
}
```

---

## Troubleshooting

### Issue: "Failed to fetch news"
**Solution**: Check your API key in `.env` file

### Issue: CORS errors
**Solution**: NewsAPI.org doesn't support client-side requests on free tier. Consider using a proxy or backend endpoint.

### Issue: Rate limit exceeded
**Solution**: Free tier allows 100 requests/day. Implement caching or upgrade plan.

---

## Alternative Free News APIs

If you need alternatives to NewsAPI.org:

1. **GNews API** - https://gnews.io/
   - 100 requests/day free
   - Similar features

2. **Currents API** - https://currentsapi.services/
   - 600 requests/day free
   - Tech news focused

3. **NewsData.io** - https://newsdata.io/
   - 200 requests/day free
   - Multiple categories

---

## Production Considerations

For production deployment:

1. **Use Backend Proxy**: Make API calls from backend to avoid exposing API key
2. **Implement Caching**: Cache news for 1-2 hours to reduce API calls
3. **Error Handling**: Always have fallback content
4. **Rate Limiting**: Monitor usage to stay within limits
5. **Upgrade Plan**: Consider paid tier for higher limits

---

## Code Location

**File**: `/frontend/src/pages/TechPulse.jsx`

**Key Functions**:
- `fetchNews()`: Fetches from NewsAPI
- `getDemoNews()`: Fallback demo data
- `transformedNews`: Converts API response to app format

---

**Note**: The current implementation uses client-side API calls which may have CORS limitations. For production, implement a backend proxy endpoint.
