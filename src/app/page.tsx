import { fetchUrlsFromStorage } from "../../firebase";
import styles from "./page.module.css";
import Image from "next/image";


const Home = async () => {
  const galleryImageUrls = await fetchUrlsFromStorage('/gallery');

  return (
    <main className={styles.landingPage}>
      <div className={styles.gallery}>
        {galleryImageUrls.map((url: string, i) => (
          <div className={styles.galleryImage} key={url}>
          
          <img key={url} src={url} alt={`gallery image ${i}`} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;