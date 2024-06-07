import { FirebaseData, FirebaseInitialData, NavItem, Section } from "@/types/sections";
import { getApp, getApps, initializeApp } from "firebase/app";
import { child, connectDatabaseEmulator, get, getDatabase, ref } from "firebase/database";
import { StorageReference, getDownloadURL, getMetadata, listAll, ref as storageRef } from 'firebase/storage';
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

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized');
} else {
  app = getApp();
  console.log('Firebase instance already existed!');
}
const database = getDatabase(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

if (process.env.NODE_ENV === 'development') {
  console.warn('using emulator for DB and storage')
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

const fetchSectionData = async (path: string): Promise<Section> => {
  console.log('------ fetchSectionData Fetching section data: ', path, ' ------');
  const startTime = Date.now();
  const dbRef = ref(database);
  let data;

  try {
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      console.log('Time taken to fetch section data: ---------------->', Date.now() - startTime, 'ms');
      data = snapshot.val();
    } else {
      console.log('No ', path, ' data available');
    }
  } catch (error) {
    console.error(error);
  }
  return data;
};

const fetchNavData = async (): Promise<NavItem[]> => {
  console.log('------ fetchNavData Fetching navigation data ------');
  const startTime = Date.now();
  const navData = [];
  const dbRef = ref(database, 'sections/');

  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      console.log('Time taken to fetch navigation data: ---------------->', Date.now() - startTime, 'ms');
      const data = snapshot.val();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          navData.push({
            label: data[key].label,
            href: data[key].href
          });
        }
      }
    } else {
      console.log('No navigation data available');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
  return navData;
};

const fetchUrlsFromStorage = async (dir?: string | null): Promise<string[]> => {
  console.log(dir, ' ------ fetchUrlsFromStorage Fetching image URLs from Storage ------ ');
  const startTime = Date.now();

  const listRef = storageRef(storage, dir || '');

  try {
    const res = await listAll(listRef);

    const urlPromises = res.items.map(async (itemRef) => {
      return getDownloadURL(itemRef);
    });

    const urls = await Promise.all(urlPromises);
    console.log('Time taken to fetch image URLs: ---------------->', urls.length, 'in', Date.now() - startTime, 'ms');
    return urls.filter((url): url is string => url !== null);
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    return [];
  }
};

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
  const [uiImages, logoImages, socialImages, navItems] = await Promise.all([
    fetchImageData('/ui'),
    fetchImageData('logo'),
    fetchImageData('icons/social'),
    fetchNavData(),
  ]);

  console.log('- Time taken to getInitialSiteData: ---------------->', Date.now() - startTime, 'ms');
  const initialData: FirebaseInitialData = {
    uiImages,
    logoImages,
    socialImages,
    navItems,
  };

  return initialData;
};

export {
  database,
  storage,
  getInitialSiteData,
  fetchSectionData,
  fetchUrlsFromStorage,
  fetchImageData,
  // analytics,
};