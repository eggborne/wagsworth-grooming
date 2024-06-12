import { ContactInfo, HomePageData, ImageMetadata, NavItem, Section } from "@/types/sections";

const isDevelopment = process.env.NODE_ENV === 'development';

const SITE_ID = 'WagsworthSiteID';

const FIREBASE_ID = 'wagsworth-editor-default-rtdb';
const DB_ROOT = isDevelopment ? `http://localhost:9000/sites/${SITE_ID}/` : `${process.env.FIREBASE_DATABASE_URL}/sites/${SITE_ID}/`;
const DB_SUFFIX = isDevelopment ? `.json?ns=${FIREBASE_ID}` : `.json`;

console.log('using root', DB_ROOT);

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchLandingPageData = async (): Promise<HomePageData> => {
  const url = `${DB_ROOT}${'homePage'}${DB_SUFFIX}`;
  return fetchData(url);
};

const fetchContactInfo = async (): Promise<ContactInfo> => {
  const url = `${DB_ROOT}${'contactInfo'}${DB_SUFFIX}`;
  return fetchData(url);
};

const fetchPageData = async (path: string): Promise<Section> => {
  const url = `${DB_ROOT}${path}${DB_SUFFIX}`;
  return fetchData(url);
};

const fetchImageMetadata = async (path: string): Promise<Record<string, ImageMetadata>> => {
  const url = `${DB_ROOT}images/${path}${DB_SUFFIX}`;
  return fetchData(url);
};

const fetchNavList = async (): Promise<NavItem[]> => {
  const url = `${DB_ROOT}sections${DB_SUFFIX}${!isDevelopment ? '?shallow=true' : ''}`;

  const shallowSiteData = await fetchData(url);
  if (!shallowSiteData) return [];

  const hrefData = Object.keys(shallowSiteData);

  const labelPromises = hrefData.map(href => fetchPageData(`sections/${href}/label`));
  const labelArray = await Promise.all(labelPromises);

  return labelArray.map((label, i) => ({
    label: label ? label.toString() : `Section ${i + 1}`,
    href: hrefData[i],
  }));
};

export {
  fetchNavList,
  fetchLandingPageData,
  fetchContactInfo,
  fetchPageData,
  fetchImageMetadata,
}