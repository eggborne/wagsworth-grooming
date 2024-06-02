import { cache } from 'react';
import { database } from '../../firebase';
import { child, get, ref } from "firebase/database";
import NavMenu from '@/components/NavMenu';
import {Section} from '@/types/sections';
import SiteSection from '@/components/SiteSection';

const fetchData = cache(async (): Promise<Section[]> => {
  console.log('Fetching data...');
  const dbRef = ref(database);
  let data;

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
  console.log('--------> Data fetched');
  return data;
});

const Home = async () => {
  const data = await fetchData();
  const navItems = data.map(item => ({
    label: item.label,
    href: item.href,
  }));

  const currentSection = 4;
  return (
    <main>
      {/* <NavMenu navItems={navItems} /> */}
      <SiteSection section={data[currentSection]} />
    </main>
  );
}

export default Home;