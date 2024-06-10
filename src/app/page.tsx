import styles from "./page.module.css";
import Image from "next/image";
import { fetchImageMetadata } from "@/scripts/db";


const Home = async () => {
  const galleryImageUrls = await fetchImageMetadata('gallery');

  return (
    <main className={styles.landingPage}>
      <div className={styles.gallery}>
        {Object.values(galleryImageUrls).map(({ url, alt }, i) => (
          <div className={styles.galleryImage} key={url}>
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={url}
              alt={alt} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;