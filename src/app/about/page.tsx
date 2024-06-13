import { fetchPageData } from "@/scripts/db";

const About = async () => {

  const sectionData = await fetchPageData('/sections/about');

  return (
    <main>
      <div className={`borderedSectionContainer`}>        
        <div className={`borderedSection`}>
          <h1>{sectionData.label}</h1>
          {'textContent' in sectionData && sectionData.textContent.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}         
        </div>
      </div>
    </main>
  );
}

export default About;