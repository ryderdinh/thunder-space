import React from "react";
import "../../App.css";
import AccountMain from "./Account/AccountMain";
import { SidebarMain } from "./SidebarMain/SidebarMain";
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
