import React from "react";
import { Link } from "react-router-dom";
export default class SidebarLogo extends React.Component {
  render() {
    return (
      <div className="sidebar_logo">
        <Link to="/">
          <img src="./images/icons/logo.svg" alt="" />
          <p>
            HRM
            <br />
            <span>ZELIOS SEA</span>
          </p>
        </Link>
      </div>
    );
  }
}
