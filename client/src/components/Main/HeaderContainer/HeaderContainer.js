import { useState, useEffect } from "react";
import NameContainer from "./NameContainer";
import { useLocation } from "react-router-dom";

export default function HeaderContainer() {
  const [state, setState] = useState("");
  let location = useLocation();
  let pathname = location.pathname;
  useEffect(() => {
    let mainPath = pathname.slice(
      pathname.lastIndexOf("/") + 1,
      pathname.length
    );

    let menuPage = {
      "": "Trang chủ",
      "table-of-work": "Bảng công",
      report: "Báo cáo",
      workflow: "Quản lí công việc",
      account: "Thông tin cá nhân",
    };
    setState(menuPage[mainPath]);
  }, [pathname]);

  return <NameContainer name={state} />;
}
