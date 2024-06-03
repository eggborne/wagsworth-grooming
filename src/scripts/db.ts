import { ref, get, child } from 'firebase/database';
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage';
import { database, storage } from '../../firebase';
import { Section } from '../types/sections';

type NavItem = {
  label: string;
  href: string;
};

export const fetchSiteData = async (path: string): Promise<Section[] | Section> => {
  console.log('Fetching ALL data...');
  const dbRef = ref(database);
  let data: Section[] | Section = [];

  try {
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      data = snapshot.val();
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error(error);
  }
  console.log('type is', typeof data, 'data is', data)
  return data;
};

export const fetchNavData = async (): Promise<NavItem[]> => {
  console.log('------ Fetching navigation data ------')
  const navData = [];
  const dbRef = ref(database, 'sections/');

  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
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
}

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