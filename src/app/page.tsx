import styles from "./page.module.css";
import { fetchImageMetadata, fetchLandingPageData } from "@/scripts/db";
import Gallery from "@/components/Gallery/Gallery";


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
      <Gallery galleryImages={galleryImages} />
    </main>
  );
}

export default Home;