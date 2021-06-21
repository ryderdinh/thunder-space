import { useState, useEffect } from "react";
import NameContainer from "./NameContainer";
import { useLocation } from "react-router-dom";

export default function HeaderContainer(props) {
  const [state, setState] = useState("");
  // let location = useLocation();
  // let pathname = location.pathname;
  // useEffect(() => {
  //   let mainPath = pathname.slice(
  //     pathname.lastIndexOf("/") + 1,
  //     pathname.length
  //   );

  //   let menuPage = {
  //     "": "Trang chủ",
  //     "table-of-work": "Bảng công",
  //     report: "Báo cáo",
  //     workflow: "Quản lí công việc",
  //     account: "Thông tin cá nhân",
  //   };
  //   setState(menuPage[mainPath]);
  // }, [pathname]);
  useEffect(() => {
    if (props.pathName.indexOf("home") !== -1) setState("Trang chủ");
    if (props.pathName.indexOf("table-of-work") !== -1) setState("Bảng công");
    if (props.pathName.indexOf("report") !== -1) setState("Báo cáo");
    if (props.pathName.indexOf("project") !== -1) setState("Dự án");
    if (props.pathName.indexOf("works") !== -1) setState("Công việc");
    if (props.pathName.indexOf("account") !== -1) setState("Tài khoản");
  }, [props.pathName]);
  console.log(props.pathName);
  console.log(props.pathName.indexOf("home") !== -1);
  return (
    <div className="view_name">
      <i class="bx bx-menu" onClick={() => props.activeSidebar()}></i>
      <NameContainer name={state} />
    </div>
  );
}
