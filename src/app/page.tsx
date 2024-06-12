import styles from "./page.module.css";
import Image from "next/image";
import { fetchImageMetadata, fetchLandingPageData } from "@/scripts/db";


const Home = async () => {

  const [galleryImages, pageData] = await Promise.all([
    fetchImageMetadata('gallery'),
    fetchLandingPageData(),
  ]);

  return (
    <main className={styles.landingPage}>
      <h1>{pageData.bannerText}</h1>
      <div className={styles.introText}>
        {Object.values(pageData.introContent).map((paragraph, p) => <p key={p}>{paragraph}</p>)}
      </div>
      <div className={styles.gallery}>
        {Object.values(galleryImages).map(({ url, alt }, i) => (
          <div className={styles.galleryImage} key={i}>
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