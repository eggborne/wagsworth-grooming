import styles from "./page.module.css";
import BorderedSection from "@/components/BorderedSection/BorderedSection";
import Note from "@/components/Note/Note";
import { RequirementsData } from "@/types";
import { getSiteData } from "@/scripts/api";
import Image from "next/image";

const Requirements = async () => {

  const sectionData = await getSiteData<RequirementsData>('WagsworthSiteID', 'liveData/sections/requirements');

  return (
    <BorderedSection>
      {sectionData.bannerImage && <div className={'bannerImage'}>
        <Image fill src={sectionData.bannerImage.url} alt={sectionData.label} />
      </div>}
      <h1>{'label' in sectionData && sectionData.label}</h1>
      <Note>
        {sectionData.note}
      </Note>
      <div className={styles.requirementList}>
        {'requirements' in sectionData && sectionData.requirements.map(({ headline, bodyText }, i) => (
          <div className={styles.requirement} key={i}>
            <h2>{headline}</h2>
            <div className={styles.description} key={i}>
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