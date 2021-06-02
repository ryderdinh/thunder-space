import React from "react";
import SidebarMain from "./SidebarMain/SidebarMain";
import AccountMain from "./Account/AccountMain";
import "../../App.min.css";
export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <SidebarMain />
        <AccountMain />
      </div>
    );
  }
}
