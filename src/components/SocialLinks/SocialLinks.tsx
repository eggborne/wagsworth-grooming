import styles from "./SocialLinks.module.css";
import Image from "next/image";
import { ImageMetadata } from "@/types/sections";

interface SocialLinksProps {
  socialImages: Record<string, ImageMetadata>;
};

const SocialLinks = ({ socialImages }: SocialLinksProps) => {

  return (
    <>
      <div className={styles.socialLabel}>Follow us</div>
      <div className={styles.socialLinks}>
        {Object.values(socialImages).map((item, i) => (
          <a key={i} href={item.href}>
            <Image
              fill
              src={item.url}
              alt={item.alt}
              sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 100px"
            />
          </a>
        ))}
      </div>
    </>
  )
}

export default SocialLinks;