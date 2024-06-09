import { FirebaseInitialData } from "@/types/sections";
import { getApp, getApps, initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage';
import { connectStorageEmulator, getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

console.log('>>>>>> executing firebase.js')

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  // measurementId: "G-3YPJ2Z7LXL"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const database = getDatabase(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

if (process.env.NODE_ENV === 'development') {
  console.warn('using emulator for DB and storage')
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

const fetchImageData = async (dir: string) => {
  console.log(dir, ' ------ fetchImageData Fetching from Storage ------ ');
  const startTime = Date.now();
  const listRef = storageRef(storage, dir);

  try {
    const res = await listAll(listRef);

    const urlPromises = res.items.map(async (itemRef) => {
      const fileName = itemRef.fullPath.split('/').pop()?.split('.')[0];
      const path = itemRef.fullPath.split('/').slice(0, -1).join('/');
      const url = await getDownloadURL(itemRef);
      return {
        path,
        fileName,
        url,
      }
    });

    const imageDataArray = await Promise.all(urlPromises);
    console.log(imageDataArray.length, 'fetched from', dir, 'in', Date.now() - startTime, 'ms');
    return imageDataArray;
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    return [];
  }
};

const getInitialSiteData = async (): Promise<FirebaseInitialData> => {
  console.log('------ getInitialSiteData Fetching data ------');
  const startTime = Date.now();
  const [uiImages, logoImages, socialImages] = await Promise.all([
    fetchImageData('ui'),
    fetchImageData('logo'),
    fetchImageData('icons/social'),
  ]);

  console.log('- Time taken to getInitialSiteData: ---------------->', Date.now() - startTime, 'ms');
  const initialData: FirebaseInitialData = {
    uiImages,
    logoImages,
    socialImages,
  };

  return initialData;
};

export {
  getInitialSiteData,
  fetchImageData,
  // analytics,
};