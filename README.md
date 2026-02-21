# Mobile Development Task- Mooveo

A React Native app for creating and viewing notes with location. Notes are stored in Firebase 
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

## What you need to run this app

**On your computer (one-time):**
- **Node.js** (LTS) and **npm** (or yarn) — to install dependencies and run the app.
- **Expo Go** on your phone (to run on a real device), **or** **Xcode** (Mac) / **Android Studio** (for iOS/Android simulators).

**You do not install Firebase on your machine.** Firebase is included as an npm dependency in this project; `npm install` installs it along with everything else (Expo, React Navigation, react-native-maps, expo-location, etc.).

**In the cloud (one-time per project):**
- A **Firebase project** with Auth and Firestore enabled. You create it in [Firebase Console](https://console.firebase.google.com), get the config keys, and put them in a local `.env` file (see below). No Firebase CLI or global install is required.

---

## Setup (after clone / pull)

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/Nir41415533/Moveo-Mobile-Task.git
   cd Mobile_Dev_Task
   npm install
   ```
   This installs all dependencies (including Firebase, Expo, react-native-maps, and the rest). Nothing else to install for the app itself.

2. **Environment variables (required)**  
   `.env` is not in the repo. Copy the example and add your Firebase config:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set these (from Firebase Console → Project settings → Your apps → config):
   - `EXPO_PUBLIC_FIREBASE_API_KEY`
   - `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
   - `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `EXPO_PUBLIC_FIREBASE_APP_ID`
   - `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID`

3. **Firebase Console (for your Firebase project)**
   - **Authentication** → Sign-in method → enable **Email/Password**.
   - **Firestore Database** → Create database (e.g. start in test mode for development).

4. **Maps**  
   `react-native-maps` is already in the project; `npm install` installs it. If you ever need to reinstall it: `npx expo install react-native-maps`.
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


## Common Issues:
-**Expo QR code doesn’t load:** Make sure your phone is on the same Wi-Fi as your computer.
-**Firestore write errors:** Check your Firestore security rules. In development, test mode is easiest.
-**Node version mismatch:** Use Node 18+ for best compatibility.
