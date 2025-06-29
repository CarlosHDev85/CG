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

## FollowUp
Testing the app and fixed the api call to use the ip of the computer we are going to test, do not change that, I noticed that the app is showing just a white card And I cant see the text, but thats fine i can see the response being sent from the server so we have communication, I want claude to finish the Profile Screen where the user can write Name, and can write in a "My Preferences" field, where the user should be able to write up to 800 words, and now gemini will take over the backend by creating the api and logic to store this on a User's database, In the frontend when the user writes their Username there should be a Confirmation button which would call the backend to see if that username is registered, if not should offer the option of registering, which will just require to set a password and use that username, create an account and login, if the username exists the app will require the users password to login, and for each user we should show their Preferences text if exists,

## Follow-Up Task: User Profile & Authentication Flow

We have verified client-server communication. Now, let’s implement a user profile system with authentication and preferences storage.

### Task Breakdown

#### 1. Gemini (Backend: User API & Logic)
- Create API endpoints for:
  - Checking if a username exists.
  - Registering a new user (username & password).
  - Logging in (username & password).
  - Saving and retrieving user Preferences.
- Store user data in a simple database (file or in-memory is fine for now).
- Ensure secure password handling (hashing).

#### 2. Claude (Frontend: Profile Screen)
- Complete the Profile Screen so users can:
  - Enter their Name.
  - Enter their "My Preferences" (up to 800 words).
  - Enter a Username with a "Confirm" button:
    - On click, call the backend to check if the username exists.
      - If it exists: prompt for password to log in.
      - If not: offer registration (set username & password).
- After login/registration, display the user’s Preferences if available.

### Who Starts First?
- **Gemini (Backend) should start first** by creating the necessary API endpoints and user logic.
- Once the endpoints are ready, **Claude (Frontend)** can integrate them into the Profile Screen.

---
