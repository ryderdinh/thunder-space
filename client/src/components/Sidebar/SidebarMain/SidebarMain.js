import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { setActiveSideBar } from "actions/index";
import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";

export function SidebarMain() {
  const dispatch = useDispatch();
  let location = useLocation();
  let pathname = location.pathname;
  useEffect(() => {
    let mainPath = pathname.slice(
      pathname.lastIndexOf("/") + 1,
      pathname.length
    );

    let menuPage = {
      "": 0,
      "table-of-work": 1,
      report: 2,
      "account": 3,
    };
    // setActiveSideBar(menuPage[mainPath]);
    dispatch(setActiveSideBar(menuPage[mainPath]));
  });
  return (
    <div className="sidebar_main">
      <SidebarLogo />
      <SidebarMenu />
    </div>
  );
}
// export default connect(null, { setActiveSideBar })(SidebarMain);
