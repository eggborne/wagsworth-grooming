import { Section } from '../types/sections';
import styles from './SiteSection.module.css';

interface SiteSectionProps {
  section: Section;
}

const SiteSection: React.FC<SiteSectionProps> = ({ section }) => {
  return (
    <section className={styles.section}>
      <h2>{section.label}</h2>

      {section.href === 'services' && (
        <>
          {section.note && <p>{section.note.join(' ')}</p>}
          <div className={styles.slidesContainer}>
            {section.slides.map((slide) => (
              <div
                key={slide.headline}
                className={styles.slide}
                style={{ backgroundColor: slide.backgroundColor }}
              >
                <h3>{slide.headline}</h3>
                <img src={'icons/' + slide.icon} alt={slide.headline} className={styles.slideIcon} />
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
            {section.pricedServices.map((service) => (
              <li key={service.name}>
                {service.name}: ${service.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </>
      )}

      {section.href === 'about' && (
        <div>
          {section.textContent.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      {section.href === 'requirements' && (
        <div>
          {section.requirements.map((req) => (
            <div key={req.headline}>
              <h3>{req.headline}</h3>
              {req.bodyText.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {section.href === 'faqs' && (
        <div>
          {section.questions.map((faq) => (
            <div key={faq.question[0]}>
              <h3>{Array.isArray(faq.question) ? faq.question.join(' ') : faq.question}</h3>
              {faq.answer.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {section.href === 'contact' && (
        <div>
          <p>Phone: {section.phone}</p>
          <p>Email: {section.email}</p>
          <p>Address:</p>
          <address>
            {section.address.map((line, index) => (
              <span key={index}>{line}<br /></span>
            ))}
          </address>
        </div>
      )}
    </section>
  );
};

export default SiteSection;
