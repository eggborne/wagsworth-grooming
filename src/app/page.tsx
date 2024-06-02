import { database } from '../../firebase';
import { get, ref } from "firebase/database";
import NavMenu from '@/components/NavMenu';

type NavItem = {
  label: string;
  href: string;
};

// const fetchData = async (): Promise<Section[]> => {
//   console.log('Fetching data...');
//   const dbRef = ref(database);
//   let data;

//   try {
//     const snapshot = await get(child(dbRef, 'sections/'));
//     if (snapshot.exists()) {
//       data = snapshot.val();
//     } else {
//       console.log('No data available');
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   console.log('--------> Data fetched');
//   return data;
// };

async function fetchNavData(): Promise<NavItem[]> {
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

const Home = async () => {
  const navItems = await fetchNavData();

  // const currentSection = data[0];
  return (
    <main>
      <NavMenu navItems={navItems} />
      
      {/* <SiteSection section={currentSection} /> */}
    </main>
  );
}

export default Home;