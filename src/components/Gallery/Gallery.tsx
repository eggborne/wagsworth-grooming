"use client"

import styles from './Gallery.module.css';
import Image from 'next/image';
import { ImageMetadata } from '@/types';
import { useState } from 'react';

type GalleryProps = {
  galleryImages: Record<string, ImageMetadata>,
}

const Gallery = ({ galleryImages }: GalleryProps) => {
  const [imageShowing, setImageShowing] = useState(0);

  const nextImage = () => {
    if (imageShowing === Object.keys(galleryImages).length - 1) {
      setImageShowing(0);
    } else {
      setImageShowing(imageShowing + 1);
    }
  }

  const prevImage = () => {
    if (imageShowing === 0) {
      setImageShowing(Object.keys(galleryImages).length - 1);
    } else {
      setImageShowing(imageShowing - 1);
    }
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryControl}>
        <div onClick={prevImage} className={styles.prevButton + ' caret'}></div>
      </div>
      <div className={styles.galleryWindow}>
        {Object.values(galleryImages).map(({ url, alt, width, height }, i) => (
          <div className={styles.galleryImageContainer + ' ' + (imageShowing === i ? styles.showing : '')}
            key={i}
            style={{
              aspectRatio: `${width / height}`,
            }}
          >
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={url}
              alt={alt}
            />
          </div>
        ))}
      </div>
      <div className={styles.galleryControl}>
        <div onClick={nextImage} className={styles.nextButton + ' caret'}></div>
      </div>
    </div>
  )
}

export default Gallery;