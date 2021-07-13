/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function SidebarItemSubMenu(props) {
  const [state, setState] = useState({ menu: false });

  // eslint-disable-next-line no-unused-vars
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  
  const handleSidebarOnMobile = () => {
    if (windowDimensions.width <= 768) {
      props.activeSidebar();
    }
  };

  return (
    <li className={state.menu ? "showMenu" : ""}>
      <div className="iocn-link">
        <a>
          <i className={props.icon}></i>
          <span className="link_name">{props.title}</span>
        </a>
        <i
          className="bx bxs-chevron-down arrow"
          onClick={() => setState({ ...state, menu: !state.menu })}
        ></i>
      </div>
      <ul className={props.type}>
        <li>
          <a className="link_name" href="/#">
            {props.title}
          </a>
        </li>
        {props.listMenu.map((item, index) => (
          <li key={index} onClick={() => handleSidebarOnMobile()}>
            <NavLink to={item.path}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
