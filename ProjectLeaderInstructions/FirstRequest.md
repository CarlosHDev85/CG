# Engineering Request: React Native App with Node.js Backend

## Overview
Create a React Native application using Expo and a Node.js backend server. The app should demonstrate client-server communication with a simple UI flow.

## Technical Requirements

### Mobile App (React Native + Expo)
- Use the latest versions of Expo and React Native.
- Use React Navigation (latest version).
- Implement two screens:
  - **HomeScreen**: Contains a button to test server connection.
  - **ProfileScreen**: Basic implementation.
- On HomeScreen, pressing the button should call the Node.js API and display the server response.
- Enable navigation between Home and Profile screens.

### Backend Server (Node.js)
- Use Node.js with Express (latest versions).
- Implement a `GET /api/status` endpoint that returns:
  - Server status
  - A test string
  - JSON response format
- Enable CORS for requests from the mobile app.

## API Response Example
```json
{
  "status": "online",
  "message": "Server is running successfully",
  "timestamp": "2025-01-28T10:30:00Z",
  "testString": "Hello from Node.js server!"
}
```

## Dependencies
- **Mobile**: expo, react-navigation, axios (or fetch API)
- **Backend**: express, cors, nodemon (for development)

## Task Distribution

### Claude Tasks
- Set up the Node.js backend server
- Create the `/api/status` endpoint
- Configure CORS and server settings
- Create basic server documentation

### Gemini Tasks
- Initialize React Native Expo project
- Set up React Navigation
- Create HomeScreen and ProfileScreen components
- Implement API call functionality
- Handle and display server response

## Success Criteria
- Mobile app launches successfully with Expo
- Navigation works between Home and Profile screens
- Button press triggers API call to Node server
- Server responds with status and test string
- Response is displayed in the mobile app
- All packages use latest stable versions
