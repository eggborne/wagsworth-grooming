import styles from "./page.module.css";
import ServiceSlide from "@/components/ServiceSlide/ServiceSlide";
import BorderedSection from "@/components/BorderedSection/BorderedSection";
import { ServicesData } from "@/types";
import Note from "@/components/Note/Note";
import { getSiteData } from "@/scripts/api";
import Image from "next/image";

const Services = async () => {

  const sectionData = await getSiteData<ServicesData>('WagsworthSiteID', 'liveData/sections/services');

  return (
    <BorderedSection>
      {sectionData.bannerImage && <div className={'bannerImage'}>
        <Image fill src={sectionData.bannerImage.url} alt={sectionData.label} />
      </div>}
      <h1>{sectionData.label}</h1>
      <Note>{sectionData.note}</Note>
      <div className={styles.slidesContainer}>
        {'slides' in sectionData && sectionData.slides.map((slide, s) => (
          <ServiceSlide key={s} slide={slide} iconUrl={s === 0 ? 'scissors.svg' : 'bath.svg'} />
        ))}
      </div>
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