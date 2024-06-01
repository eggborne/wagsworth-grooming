"use client";

import { useEffect } from 'react';
import styles from "./NavMenu.module.css";


const NavMenu = ({ data }: { data: any }) => {
  useEffect(() => {
    console.log('Client-side effect');
  }, []);

  return (
    <div className={styles.navMenu}>
      nav menu
    
      {data && typeof data === 'object' ? (
        Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h2>{key}</h2>
            {/* <p>{(value as { textContent: string }).textContent}</p> */}
          </div>
        ))
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
};

export default NavMenu;