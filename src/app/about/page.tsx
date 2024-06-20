import BorderedSection from "@/components/BorderedSection/BorderedSection";
import { AboutData } from "@/types";
import { getSiteData } from "@/scripts/api";
import Image from "next/image";

const About = async () => {

  const sectionData = await getSiteData<AboutData>('WagsworthSiteID', 'liveData/sections/about');

  return (
    <BorderedSection>
      {sectionData.bannerImage && <div className={'bannerImage'}>
        <Image fill src={sectionData.bannerImage.url} alt={sectionData.label} />
      </div>}
      <h1>{sectionData.label}</h1>
      <article>
        {'textContent' in sectionData && sectionData.textContent.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </article>
    </BorderedSection>
  );
}

export default About;