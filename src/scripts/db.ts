import { NavItem, Section } from "@/types/sections";

// const DB_ROOT = `http://127.0.0.1:9000/`;

const DB_ROOT = process.env.FIREBASE_DATABASE_URL;
console.log('using root', DB_ROOT)

const fetchPageData = async (path: string): Promise<Section> => {
  const pageData = await fetch(
    `${DB_ROOT}${path}.json`,
    {
      next: { revalidate: 600 },
    }
  );
  const data = await pageData.json();
  
  return data;
}

const fetchNavList = async (): Promise<NavItem[]> => {
  const shallowSiteData = await fetch(
    `${DB_ROOT}sections.json?shallow=true`,
    {
      next: { revalidate: 600 },
    }
  );
  const navData: NavItem[] = [];
  let hrefData = await shallowSiteData.json();
  hrefData = Object.keys(hrefData);

  const labelArray = await Promise.all([
    fetchPageData(`sections/${hrefData[0]}/label`),
    fetchPageData(`sections/${hrefData[1]}/label`),
    fetchPageData(`sections/${hrefData[2]}/label`),
    fetchPageData(`sections/${hrefData[3]}/label`),
    fetchPageData(`sections/${hrefData[4]}/label`),
  ])
  labelArray.forEach((item, i) => {
    const newNavItem = {
      label: item.toString(),
      href: hrefData[i],
    };
    navData.push(newNavItem);
  });
  return navData;
}

export {
  fetchNavList,
  fetchPageData,
}