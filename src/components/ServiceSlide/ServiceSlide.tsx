import styles from './ServiceSlide.module.css';
import Image from 'next/image';

type ServiceSlideProps = {
  slide: {
    headline: string;
    textContent: string[];
  },
  iconUrl: string,
}

const ServiceSlide = ({ slide, iconUrl }: ServiceSlideProps) => {
    
  console.log('ServiceSlide rendered');
  return (
    <div
      key={slide.headline}
      className={styles.slide + ' shadowed-border'}
    >
      <div className={styles.slideHeader}>
        <h2>{slide.headline}</h2>
        <div className={styles.slideIcon} style={{ aspectRatio: 1 }}>
          <Image fill src={iconUrl} alt={slide.headline} />
        </div>
      </div>
      <ul>
        {slide.textContent.map((text, index) => (
          <li key={index}>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceSlide;