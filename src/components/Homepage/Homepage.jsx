import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <div id="homepage">
      <div className="title">
        <img src="assets/logo.png" alt="" className="icon" />
        <h1>uizle <div>App</div></h1>
      </div>
      <p>Let's test your knowledge</p>
      <button id="home-btn" ><Link style={{textDecoration:'none',color:'white'}} to={'/options'}>Let's get started</Link></button>
    </div>
  );
};
