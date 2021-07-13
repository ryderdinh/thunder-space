import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { actFetchStaffInfomation } from "actions";
import { removeCookie } from "units/cookieWeb";
import { NavLink } from "react-router-dom";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function Account(props) {
  // eslint-disable-next-line no-unused-vars
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const handleSidebarOnMobile = () => {
    if (windowDimensions.width <= 768) {
      props.activeSidebar();
    }
  };

  const account = useSelector(
    (state) => state._staffInfomation._staffInfomation
  );

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
          <img
            src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-9/182288612_2911326315777633_865059058360099424_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Zx9wHyp5QUgAX_TqUIK&_nc_ht=scontent.fhan3-1.fna&oh=d87e99468059c5360d9a4d6e98382ec6&oe=60D4CCE5"
            alt="profile"
          />
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
