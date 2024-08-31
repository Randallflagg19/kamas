import React from "react";
import styles from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.item}>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div className={`${styles.item} ${styles.active}`}>
        <NavLink to="/dialogs">Messages</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/news">News</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/music">Music</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/settings">Settings</NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to="/users">Users</NavLink>
      </div>
    </nav>
  );
}
