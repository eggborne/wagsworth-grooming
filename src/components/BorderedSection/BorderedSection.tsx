import styles from './BorderedSection.module.css';

const BorderedSection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <div className={styles.borderedSectionContainer}>
        <div className={styles.borderedSection}>
          {children}
        </div>
      </div>
    </main>
  );
}

export default BorderedSection;