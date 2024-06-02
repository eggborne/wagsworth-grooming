import { getApp, getApps, initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-3YPJ2Z7LXL"
};

// Ensure the app is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize the database instance from the already initialized app
const database = getDatabase(app);

if (process.env.NODE_ENV === 'development') {
  // Point to the RTDB emulator running on localhost.
  console.warn('using emulator for DB')
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
} 

// const analytics = getAnalytics(app);

console.log('Firebase initialized')

export { database };