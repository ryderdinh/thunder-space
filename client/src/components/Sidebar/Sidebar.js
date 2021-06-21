import React, { Component } from "react";
import Account from "./Account";
import SidebarItem from "./SidebarItem";
import SidebarItemSubMenu from "./SidebarItemSubMenu";
import "./style.css";
export class Sidebar extends Component {
  render() {
    return (
      <div className={this.props.sidebar ? "sidebar" : "sidebar close"}>
        <div className="logo-details">
          <div className="logo">
            <img
              src={require("assets/images/icons/logo-new.png").default}
              alt="logo"
            />
          </div>
          <span className="logo_name">Zelios Sea</span>
        </div>
        <ul className="nav-links">
          <SidebarItem
            path="/"
            title="Trang chủ"
            type="sub-menu blank"
            icon="bx bx-grid-alt"
          />
          <SidebarItem
            path="/table-of-work"
            title="Bảng công"
            type="sub-menu blank"
            icon="bx bx-line-chart"
          />
          <SidebarItem
            path="/report"
            title="Báo cáo"
            type="sub-menu blank"
            icon="bx bx-pie-chart-alt-2"
          />
          <SidebarItemSubMenu
            title="Quản lý"
            type="sub-menu"
            icon="bx bx-pie-chart-alt-2"
            listMenu={[
              { path: "/work", name: "Công việc" },
              { path: "/project", name: "Dự án" },
            ]}
          />
          {/* <li>
            <div className="profile-details">
              <div className="profile-content">
                <img
                  src="https://www.centraltest.com/sites/default/files/inline-images/matching-predictif-hp.png"
                  alt="profile"
                />
              </div>
              <div className="name-job">
                <div className="profile_name">quanganhth2440</div>
                <div className="job">Web Desginer</div>
              </div>
              <i className="bx bx-log-out"></i>
            </div>
          </li> */}
          <Account />
        </ul>
      </div>
    );
  }
}

export default Sidebar;
