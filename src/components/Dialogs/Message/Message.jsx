import React from "react";
import styles from "./Message.module.css";



export default function Message(props) {
  return <div className={styles.message}>{props.message}</div>;
}
