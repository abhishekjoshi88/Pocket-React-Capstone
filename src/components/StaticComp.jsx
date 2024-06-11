import React from 'react'
import lock from "../assets/lock.png";
import banner from "../assets/Banner.png";
import "./Main.css";

const StaticComp = () => {
  return (
    <>
      <div className="static-text">
        <img src={banner} alt="banner"></img>
        <h2 className="title">PocketNotes</h2>
        <p className="desc">
          Send and receive messages without keeping your phone online.
          <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <footer className="footer_area">
        <img src={lock} alt="lock-img"></img>
        <p>end-to-end encrypted</p>
          
      </footer>
    </>
  );
}

export default StaticComp