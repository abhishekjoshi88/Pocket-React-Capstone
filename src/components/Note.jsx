import React from "react";
import styles from "./Notes.module.css";

const Note = (prop) => {
  return (
    <div className={styles.flex_util}>
      <div>
        <p className={styles.Time}>{prop.note.time}</p>
        <p className={styles.Date}>{prop.note.date}</p>
      </div>
      <p className={styles.Text}>{prop.note.note}</p>
      {/* <button onClick={() => console.log("hi")}>x</button> */}
    </div>
  );
};

export default Note;
