import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveSideBar, changeNameContainer } from "actions";

export default function SideMobileItem({ icon, title, to, index, clsName }) {
  const dispatch = useDispatch();
  return (
    <li
      className={clsName}
      onClick={() => {
        dispatch(setActiveSideBar(index));
        dispatch(changeNameContainer(title));
      }}
    >
      <Link to={to}>
        <span className="icon">
          <i className={icon}></i>
        </span>
        <span className="title">{title}</span>
      </Link>
    </li>
  );
}
