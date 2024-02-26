import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <nav className={styles.nav}>
        <Link href='/' data-testid="home-link">
          Home
        </Link>

        <Link href='/about' data-testid="about-link">
          About
        </Link>
      </nav>
    </div>
  )
}

export default Navbar;