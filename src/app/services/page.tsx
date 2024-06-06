import { fetchSiteData, fetchUrlsFromStorage } from "../../../firebase";
import styles from "./page.module.css";

const Services = async () => {

  const [sectionData, iconUrls] = await Promise.all([
    fetchSiteData('sections/0'),
    fetchUrlsFromStorage('icons')
  ]);
  const groomUrl = iconUrls[3];
  const bathUrl = iconUrls[0];

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      <blockquote className={styles.note}>
        Note: {'note' in sectionData && sectionData.note}
      </blockquote>
      <div className={styles.slidesContainer}>
        {'slides' in sectionData && sectionData.slides.map((slide, s) => (
          <div
            key={slide.headline}
            className={styles.slide}
          >
            <h2>{slide.headline}</h2>
            <img src={s === 0 ? groomUrl : bathUrl} alt={slide.headline} className={styles.slideIcon} />
            <ul>
              {slide.textContent.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h3>A la Carte Services</h3>
      <ul>
        {'pricedServices' in sectionData && sectionData.pricedServices.map((service) => (
          <li key={service.name}>
            {service.name}: ${service.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Services;