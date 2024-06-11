import React, { useState, useEffect } from "react";
import sendIcon from "../assets/send.png";
import BackBtn from "../assets/back.png";
import styles from "./Notes.module.css";
import Note from "./Note";
import { getScreenSize } from "../utils";

const Notes = (props) => {
  const [note, setNote] = useState("");
  const [screenSize, setScreenSize] = useState(getScreenSize());

  let groupSelect = props.groupSelect;
  let notes = groupSelect.notes;
  let groups = props.groups;
  let setGroups = props.setGroups;

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreenSize());
    };
    window.addEventListener("resize", Screen);
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    let newGroup = [...groups];
    // console.log(`newGroup - ${JSON.stringify(newGroup)}`)
    let combine_group = newGroup[groupSelect.id];
    // console.log(`combine group - ${JSON.stringify(combine_group)}`)

    let time = `${new Date().toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;

    let date = ` ${new Date().toLocaleDateString([], {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;

    combine_group["notes"].push({ date, time, note });
    localStorage.setItem("groups", JSON.stringify(newGroup));
    setGroups(newGroup);
  };

  const onEnter = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
      setNote("");
    }
  };

  const renderHeader = () => (
    <div className={styles.notes_title}>
      {screenSize.width < 989 && (
        <img
          src={BackBtn}
          alt="BackBtn"
          onClick={() => {
            window.location.reload();
          }}
        />
      )}
      <div
        className={styles.notes_group}
        style={{ background: groupSelect.color }}
      >
        {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
      </div>
      <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
    </div>
  );

  const renderNotes = () => (
    <div className={screenSize.width < 989 ? styles.mob_util : styles.date}>
      {notes.map((note, index) => (
        <Note key={index} note={note} />
      ))}
    </div>
  );

  const renderTextarea = () => (
    <div className={screenSize.width < 989 ? styles.mob_text : styles.Textarea}>
      <textarea
        className={screenSize.width < 989 ? styles.inp_mob : styles.TextInput}
        type="text"
        value={note}
        onChange={handleChange}
        placeholder="Enter your text here..."
        onKeyDown={onEnter}
      ></textarea>
      <img
        src={sendIcon}
        className={screenSize.width < 989 ? styles.img_mob : styles.arrow_btn}
        alt="Send"
        onClick={handleSubmit}
      />
    </div>
  );

  return (
    <div>
      {renderHeader()}
      {renderNotes()}
      {renderTextarea()}
    </div>
  );
};

export default Notes;
