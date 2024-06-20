import styles from "./page.module.css";
import Gallery from "@/components/Gallery/Gallery";
import { getSiteData } from "@/scripts/api";
import { HomePageData, ImageMetadata } from "@/types";


const Home = async () => {
  const [galleryImages, pageData] = await Promise.all([
    getSiteData<Promise<Record<string, ImageMetadata>>>('WagsworthSiteID', 'liveData/images/gallery'),
    getSiteData<Promise<HomePageData>>('WagsworthSiteID', 'liveData/homePage'),
  ]);

  return (
    <main className={styles.landingPage}>
      <h1>{pageData.bannerText}</h1>
      <div className={styles.introText}>
        {pageData.introContent.map((paragraph, p) => <p key={p}>{paragraph}</p>)}
      </div>
      <Gallery galleryImages={galleryImages} />
    </main>
  );
}

export default Home;