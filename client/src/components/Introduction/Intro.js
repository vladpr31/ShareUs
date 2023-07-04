import React from "react";
import "../Introduction/Intro.css";

const Intro = () => {
  return (
    <div className="main-container">
      <div className="border-container">
        <div className="camera-box">
          <div className="innerbox"></div>
          <h1 className="title">Welcome To PixMix</h1>
          <h4 className="title-desc">A World Full Of Sharing</h4>
        </div>
      </div>
      <button className="enter-btn">Enter Website</button>

      <div className="description">
        <h1 className="desc-title">PixMix</h1>
        <p className="describe">
          Lorem Ipsum, Lorem Ipsum Lorem Ipsum. Lorem Ipsum, Lorem Ipsum Lorem
          Ipsum. Lorem Ipsum, Lorem Ipsum Lorem Ipsum. Lorem Ipsum, Lorem Ipsum
          Lorem Ipsum. Lorem Ipsum, Lorem Ipsum Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

export default Intro;
