import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Notes from "./Notes";

import "./Main.css";
import { getScreenSize } from "../utils";
import StaticComp from "./StaticComp";

const Main = () => {
  const [groupSelect, setGroupSelect] = useState(null);
  const [groups, setGroups] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreenSize());
    };
    window.addEventListener("resize", Screen);

    const fetchGroup = async () => {
      let storedGroups = localStorage.getItem("groups");
      if (storedGroups) {
        let groups = await JSON.parse(storedGroups);
        setGroups(groups);
      }
    };
    fetchGroup();
  }, []);

  const handleClick = (group) => {
    setGroupSelect(group);
  };

  console.log(groups);
  return (
    <>
      {screenSize.width < 989 ? (
        <div className="mobile-container">
          {groupSelect ? (
            <Notes
              groupSelect={groupSelect}
              groups={groups}
              setGroups={setGroups}
            />
          ) : (
            <>
              <h1 className="headingMobile">Pocket Notes</h1>
              <button
                className="CreateButtonMobile"
                onClick={() => setOpenModal(true)}
              >
                + Create Notes group
              </button>
              <div className="GroupList">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`groupItem ${
                      groupSelect === group ? "selected" : ""
                    }`}
                    onClick={() => handleClick(group)}
                  >
                    <div
                      className="groupIcon"
                      style={{ background: group.color }}
                    >
                      {group.groupName?.slice(0, 2)?.toUpperCase()}
                    </div>
                    <h2 className="groupName">{group.groupName}</h2>
                  </div>
                ))}
              </div>
            </>
          )}

          {openModal && (
            <Modal
              closeModal={setOpenModal}
              setGroups={setGroups}
              groups={groups}
            />
          )}
        </div>
      ) : (
        <>
          <div className="container">
            <h1 className="heading">Pocket Notes</h1>
            <button className="create-btn" onClick={() => setOpenModal(true)}>
              + Create Notes group
            </button>
            <div className="group">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`groupItem ${
                    groupSelect === group ? "selected" : ""
                  }`}
                  onClick={() => handleClick(group)}
                >
                  <div
                    className="groupIcon"
                    style={{ background: group.color }}
                  >
                    {/* {group.groupName?.slice(0, 2)?.toUpperCase()} */}
                  </div>
                  <h2 className="groupName">{group.groupName}</h2>
                </div>
              ))}
            </div>
          </div>
          {openModal && (
            <Modal
              closeModal={setOpenModal}
              setGroups={setGroups}
              groups={groups}
            />
          )}
          <div className="notes-container">
            {groupSelect ? (
              <Notes
                groupSelect={groupSelect}
                groups={groups}
                setGroups={setGroups}
              />
            ) : (
              <StaticComp />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Main;
