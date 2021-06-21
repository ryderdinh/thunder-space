/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SidebarItemSubMenu(props) {
  const [state, setState] = useState({ menu: false });
  return (
    <li className={state.menu ? "showMenu" : ""}>
      <div class="iocn-link">
        <a>
          <i className={props.icon}></i>
          <span className="link_name">{props.title}</span>
        </a>
        <i
          class="bx bxs-chevron-down arrow"
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
          <li key={index}>
            <NavLink to={item.path}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
