import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>Dynamic Sitemap Example</div>
        <nav className={styles.nav}>
          <Link href={'/'}>Home</Link>
          <Link href={'/blogs'}>All Blog Posts</Link>
          <Link href={'/about'}>About</Link>
          <Link href={'/contact'}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
