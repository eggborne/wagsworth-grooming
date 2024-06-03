import { fetchSiteData, fetchUrlsFromStorage } from "@/scripts/db";
import styles from "./page.module.css";

const Services = async () => {

  const sectionData = await fetchSiteData('sections/0');
  const iconUrls = await fetchUrlsFromStorage('icons');

  return (
    <main>
      <h1>{'label' in sectionData && sectionData.label}</h1>
      <div className={styles.slidesContainer}>
        {'slides' in sectionData && sectionData.slides.map((slide, s) => (
          <div
            key={slide.headline}
            className={styles.slide}
          >
            <h3>{slide.headline}</h3>
            <img src={iconUrls[s === 0 ? 1 : 0]} alt={slide.headline} className={styles.slideIcon} />
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