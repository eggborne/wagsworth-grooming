import { cache } from 'react';
import styles from "./page.module.css";
import Logo from "@/components/Logo";
import { database } from '../../firebase';
import { child, get, ref } from "firebase/database";
import NavMenu from '@/components/NavMenu';

const fetchData = cache(async () => {
  console.log('Fetching data...');
  const dbRef = ref(database);
  let data = 'No content available';

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
  console.log('Data fetched:', data);
  return data;
});

const Home = async () => {
  const data = await fetchData();
  return (
    <main className={styles.main}>
      <header className={`${styles.header} ${false && styles.expanded}`}>
        <Logo />
      </header>
      <NavMenu data={data} />

      <footer className={styles.footer}>by mikedonovan.dev</footer>
    </main>
  );
}

export default Home;