import { fetchUrlsFromStorage } from "@/scripts/db";
import styles from "./page.module.css";


const Home = async () => {
  const galleryImageUrls = await fetchUrlsFromStorage('/gallery');

  return (
    <main className={styles.landingPage}>
      <div className={styles.gallery}>
        {galleryImageUrls.map((url: string, i) => (
          <img key={url} src={url} alt={`gallery image ${i}`} />
        ))}
      </div>
    </main>
  );
}

export default Home;