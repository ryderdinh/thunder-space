import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { actFetchStaffInfomation } from "actions";
import { removeCookie } from "units/cookieWeb";
import { NavLink } from "react-router-dom";
import Puff from "assets/bower_components/SVG-Loaders/svg-loaders/puff.svg";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function Account(props) {
  //? Create State
  // eslint-disable-next-line no-unused-vars
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  //? Connect redux
  const account = useSelector(
    (state) => state._staffInfomation._staffInfomation
  );

  //? Create Function
  const handleSidebarOnMobile = () => {
    if (windowDimensions.width <= 768) {
      props.activeSidebar();
    }
  };
  const signOut = () => {
    removeCookie(true, true);
    window.location.href = window.location.origin;
  };

  return (
    <li>
      <div className="profile-details">
        <NavLink
          to="/account"
          className="profile-content"
          onClick={() => handleSidebarOnMobile()}
        >
          {account.avatar === undefined ? (
            <img src={Puff} alt="profile" />
          ) : (
            <img src={account.avatar} alt="profile" />
          )}
        </NavLink>
        <NavLink
          to="/account"
          className="name-job"
          onClick={() => handleSidebarOnMobile()}
        >
          <div className="profile_name">{account.name}</div>
          <div className="job">{account.position}</div>
        </NavLink>
        <i className="bx bx-log-out" onClick={() => signOut()}></i>
      </div>
    </li>
  );
}
