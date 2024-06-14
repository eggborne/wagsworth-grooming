import BorderedSection from "@/components/BorderedSection/BorderedSection";
import { fetchPageData } from "@/scripts/db";
import { AboutData } from "@/types/sections";

const About = async () => {

  const sectionData = await fetchPageData('/sections/about') as AboutData;

  return (
    <BorderedSection>
      {sectionData.bannerImage && <div className={'bannerImage'}>
        <img src={sectionData.bannerImage.url} alt={sectionData.label} />
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