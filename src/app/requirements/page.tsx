import BorderedSection from "@/components/BorderedSection/BorderedSection";
import { fetchPageData } from "@/scripts/db";
import { RequirementsData } from "@/types/sections";

const Requirements = async () => {

  const sectionData = await fetchPageData('sections/requirements') as RequirementsData;

  return (
    <BorderedSection>
      {sectionData.bannerImage && <div className={'bannerImage'}>
        <img src={sectionData.bannerImage.url} alt={sectionData.label} />
      </div>}
      <h1 style={{ fontSize: 'calc(var(--image-border-width) / 2.5) !important' }}>{'label' in sectionData && sectionData.label}</h1>
      <blockquote>
        Note: {'note' in sectionData && sectionData.note}
      </blockquote>
      {/* <div className={'section ' + styles.requirementsSection}> */}
      <div>
        {'requirements' in sectionData && sectionData.requirements.map(({ headline, bodyText }, i) => (
          <div key={i}>
            <h2>{headline}</h2>
            <div key={i}>
              {bodyText.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BorderedSection >
  );
}

export default Requirements;