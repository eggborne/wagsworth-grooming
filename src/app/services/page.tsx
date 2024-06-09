import Image from "next/image";
import { fetchImageData } from "../../../firebase";
import { fetchPageData } from "@/scripts/db";
import styles from "./page.module.css";

const Services = async () => {

  const [sectionData, iconUrls] = await Promise.all([
    fetchPageData('sections/services'),
    fetchImageData('icons'),
  ]);
  const groomUrl = iconUrls.filter(icon => icon.fileName === 'scissors')[0].url;
  const bathUrl = iconUrls.filter(icon => icon.fileName === 'bath')[0].url;

  return (
    <main>
      <h1>{sectionData.label}</h1>
      <div className={styles.slidesContainer}>
        {'slides' in sectionData && sectionData.slides.map((slide, s) => (
          <div
            key={slide.headline}
            className={styles.slide}
          >
            <h2>{slide.headline}</h2>
            <div className= {styles.slideIcon}>
              <Image fill src={s === 0 ? groomUrl : bathUrl} alt={slide.headline} />
            </div>
            <ul>
              {slide.textContent.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <blockquote className={styles.note}>
        Note: {'note' in sectionData && sectionData.note}
      </blockquote>
      <div className={styles.alaCartArea}>
        <h2>A la Carte Services</h2>
        <ul>
          {'pricedServices' in sectionData && sectionData.pricedServices.map((service) => (
            <li key={service.name}>
              {service.name}: ${service.price}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Services;