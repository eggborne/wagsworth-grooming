import { ImageMetadata, NavItem, SectionData, SiteContentData, SiteMetaInfo, UserData } from '../types'

export const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://firebase-backend-beis.onrender.com/api';

// Helper function to handle fetch requests
async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function getUserInfo(userID: string): Promise<UserData> {
  const url = `${API_BASE_URL}/user/${userID}`;
  return fetchData<UserData>(url);
}

async function getSiteMetaInfo(siteID: string): Promise<SiteMetaInfo> {
  const url = `${API_BASE_URL}/site/${siteID}/metaInfo/`;
  return fetchData<SiteMetaInfo>(url);
}

async function getSiteData<T>(siteID: string, path: string): Promise<T> {
  const encodedPath = encodeURIComponent(path); // Ensure the path is URL-safe
  const url = `${API_BASE_URL}/site/${siteID}/${encodedPath}/`;
  return fetchData<T>(url);
}

async function getNavItems(): Promise<NavItem[]> {
  const sectionsUrl = `${API_BASE_URL}/site/WagsworthSiteID/liveData/sections/`;
  const sections = await fetchData<SectionData[]>(sectionsUrl);
  const hrefData = Object.keys(sections);

  const labelPromises: any[] = [];
  const orderPromises: any[] = [];
  hrefData.forEach(href => {
    labelPromises.push(getSiteData('WagsworthSiteID', `liveData/sections/${href}/label`));
    orderPromises.push(getSiteData('WagsworthSiteID', `liveData/sections/${href}/order`));
  });
  const labelArray = await Promise.all(labelPromises);
  const orderArray = await Promise.all(orderPromises);

  const nextNavItems:NavItem[] = labelArray.map((label, i) => ({
    label: label,
    href: hrefData[i],
    order: orderArray[i],
  })).sort((a, b) => a.order - b.order);

  return nextNavItems;
}

export { getUserInfo, getNavItems, getSiteMetaInfo, getSiteData };

