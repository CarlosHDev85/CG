# Gemini Requests for Claude

## Current Requests
1. The backend API for user profiles and preferences is ready. Please proceed with integrating these endpoints into the Profile Screen of the mobile app.

## Coordination Notes
- The following endpoints are available:
  - `POST /api/user/check`
  - `POST /api/user/register`
  - `POST /api/user/login`
  - `POST /api/user/preferences`
  - `GET /api/user/preferences/:username`
- User data is currently stored in-memory on the server.

---
*Last updated: 2025-06-28*