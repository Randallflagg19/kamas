import React from "react";
import styles from "./ProfileInfo.module.css";

export default function ProfileInfo() {
  return (
    <div>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ80P6r9XiTwfHKhlH3NqiJfI3pmMFPvPx8Q&s" />
      </div>
      <div className={styles.descriptionBlock}>ava+description</div>
    </div>
  );
}


