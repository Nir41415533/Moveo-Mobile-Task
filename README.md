# Mobile Development Task- Mooveo

A React Native app for creating and viewing notes with location. Notes are stored in Firebase ;
 authentication uses Firebase Auth with persistent login.

## Features

- **Auth:** Login and Sign up (Firebase). Session persists across app restarts (AsyncStorage).
- **Main screen:** Welcome message, logout, and two view modes Map and a List:
- **List:** All notes sorted by creation date- newest first. Tap a note to view/edit.
- **Map:** Notes with location shown as pins. Tap a pin to open the note.
- **Empty state:** an a Message when there is no notes.
- **Bottom tabs:** Switch between List and Map.
- **FABICON:** Floating action button to create a new note.
- **Note screen:** Date the default is for today, title, body, Save, and Delete. On Save, the current device location is attached to the note.
- **Data:** Stored in Firestore; list and map refresh when returning to the screen or after saving/deleting.
- **Image Attachment (Bonus):** Supports attaching images via camera or gallery. Images are compressed and stored as Base64 strings directly within Firestore documents, ensuring seamless data retrieval and eliminating the need for external storage configurations for this MVP.

## Tech Stack

- **Framework:** React Native with Expo 
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **Auth & persistence:** Firebase Auth + `getReactNativePersistence(AsyncStorage)`
- **Database:** Firebase Firestore
- **Maps:** react-native-maps
- **Location:** expo-location
- **Env:** `dotenv` + `app.config.js` (Expo `extra`) 

## Prerequisites
- Node.js (LTS)
- npm or yarn
- Expo Go on your device, or Android Studio / Xcode for emulators
- A Firebase project (Auth + Firestore enabled)

## Setup (after clone / pull)

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd Mobile_Dev_Task
   npm install
   ```

2. **Environment variables (required)**  
   `.env` is not in the repo. Copy the example and add your own Firebase config:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set:
   - `EXPO_PUBLIC_FIREBASE_API_KEY`
   - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
   - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `EXPO_PUBLIC_FIREBASE_APP_ID`
   - `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID`

   Get these from the Firebase Console → Project settings → Your apps.

3. **Firebase**
   - Enable **Email/Password** sign-in in Authentication.
   - Create a **Firestore** database (ive created it in test mode)

4. **Maps (optional)**  
   For the map screen, install the maps dependency :
   ```bash
   npx expo install react-native-maps
   ```
## Run

```bash
npm start
```

Then:

- Press **i** for iOS simulator (or scan QR with Expo Go on iPhone).
- Press **a** for Android emulator (or scan QR with Expo Go on Android).
- Or scan the QR code with Expo Go on a physical device.


## Notes

- **Date format** for notes is YYYY-DD-MM (year–day–month).
- **Image:** One image per note (camera/gallery), stored as base64 in Firestore.
