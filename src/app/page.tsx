import { ImageData } from "@/types/sections";
import { fetchImageData } from "../../firebase";
import styles from "./page.module.css";
import Image from "next/image";


const Home = async () => {
  const galleryImageUrls = await fetchImageData('/gallery') as ImageData[];

  return (
    <main className={styles.landingPage}>
      <div className={styles.gallery}>
        {galleryImageUrls.map(({ url }, i) => (
          <div className={styles.galleryImage} key={url}>
            <Image fill src={url} alt={`gallery image ${i}`} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;