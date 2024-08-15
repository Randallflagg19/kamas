import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.item}>
        <NavLink to='/profile'>Profile</NavLink>
      </div>
      <div className={`${styles.item} ${styles.active}`}>
        <NavLink to='/dialogs'>Messages</NavLink>
      </div>
      <div className={styles.item}>
      <NavLink to='/News'>News</NavLink>
        
      </div>
      <div className={styles.item}>
      <NavLink to='/Music'>Music</NavLink>
       
      </div>
      <div className={styles.item}>
      <NavLink to='/Settings'>Settings</NavLink>
        
      </div>
    </nav>
  );
}
