# Backend Server

Node.js Express server for React Native app communication.

## Setup
```bash
npm install
npm run dev    # Development with nodemon
npm start      # Production
```

## API Endpoints

### GET /api/status
Returns server status and test data for mobile app.

**Response:**
```json
{
  "status": "online",
  "message": "Server is running successfully", 
  "timestamp": "2025-06-28T10:30:00Z",
  "testString": "Hello from Node.js server!"
}
```

## Configuration
- Port: 3000 (configurable via PORT env var)
- CORS: Enabled for React Native app
- JSON parsing: Enabled

## Usage
The server runs on `http://localhost:3000` and provides the `/api/status` endpoint for the React Native app to test connectivity.