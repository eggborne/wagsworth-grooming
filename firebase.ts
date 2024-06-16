import { getApp, getApps, initializeApp } from "firebase/app";
import { EmailAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

console.log('FIREBASE.js running using config:', firebaseConfig);

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);
const storage = getStorage(app);

if (process.env.NODE_ENV === 'development') {
  console.warn('using emulator for DB and storage')
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}