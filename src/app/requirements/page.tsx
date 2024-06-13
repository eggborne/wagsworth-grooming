import { fetchPageData } from "@/scripts/db";

const Requirements = async () => {

  const sectionData = await fetchPageData('sections/requirements');

  return (
    <main>
      <div className={`borderedSectionContainer`}>
        <div className={`borderedSection`}>
          <h1 style={{ fontSize: 'calc(var(--image-border-width) / 2.5) !important'}}>{'label' in sectionData && sectionData.label}</h1>
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
        </div>
      </div>
    </main>
  );
}

export default Requirements;