import { ref, get, child } from 'firebase/database';
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage';
import { database, storage } from '../../firebase';
import { Section } from '../types/sections';

export const fetchSiteData = async (): Promise<Section[]> => {
  console.log('Fetching ALL data...');
  const dbRef = ref(database);
  let data: Section[] = [];

  try {
    const snapshot = await get(child(dbRef, 'sections/'));
    if (snapshot.exists()) {
      data = snapshot.val();
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const fetchUrlsFromStorage = async (dir?: string | null): Promise<string[]> => {
  console.log(dir, ' ------ Fetching image URLs from Storage ------ ')
  const listRef = storageRef(storage, dir || '');

  try {
    const res = await listAll(listRef);

    const urlPromises = res.items.map(async (itemRef) => {
      return getDownloadURL(itemRef);
    });

    const urls = await Promise.all(urlPromises);
    return urls.filter((url): url is string => url !== null);
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    return [];
  }
};