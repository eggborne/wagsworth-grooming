import { ImageData } from '@/types/sections';
import styles from './ServiceSlide.module.css';
import Image from 'next/image';
import { fetchImageData } from '../../../firebase';

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
      className={styles.slide}
    >
      <h2>{slide.headline}</h2>
      <div className={styles.slideIcon}>
        <Image fill src={iconUrl} alt={slide.headline} />
      </div>
      <ul>
        {slide.textContent.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceSlide;