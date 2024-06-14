import { fetchPageData } from "@/scripts/db";
import styles from "./page.module.css";
import ServiceSlide from "@/components/ServiceSlide/ServiceSlide";
import BorderedSection from "@/components/BorderedSection/BorderedSection";
import { ServicesData } from "@/types/sections";

const Services = async () => {

  const sectionData = await fetchPageData('sections/services') as ServicesData;

  return (
    <BorderedSection>
      {sectionData.bannerImage && <div className={'bannerImage'}>
        <img src={sectionData.bannerImage.url} alt={sectionData.label} />
      </div>}
      <h1>{sectionData.label}</h1>
      <div className={styles.slidesContainer}>
        {'slides' in sectionData && sectionData.slides.map((slide, s) => (
          <ServiceSlide key={s} slide={slide} iconUrl={s === 0 ? 'scissors.svg' : 'bath.svg'} />
        ))}
      </div>
      <blockquote>
        Note: {'note' in sectionData && sectionData.note}
      </blockquote>
      <div className={styles.alaCartArea}>
        <h2>A la Carte Services</h2>
        <ul>
          {'pricedServices' in sectionData && sectionData.pricedServices.map((service, s) => (
            <li key={s}>
              {service.name}: ${service.price}
            </li>
          ))}
        </ul>
      </div>
    </BorderedSection>
  );
}

export default Services;