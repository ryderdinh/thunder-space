import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarItem(props) {
  return (
    <li>
      <NavLink to={props.path}>
        <i className={props.icon}></i>
        <span className="link_name">{props.title}</span>
      </NavLink>
      <ul className={props.type}>
        <li>
          <a href="/#" className="link_name">
            {props.title}
          </a>
        </li>
      </ul>
    </li>
  );
}
