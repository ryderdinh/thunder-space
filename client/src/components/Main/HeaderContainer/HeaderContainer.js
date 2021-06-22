import { useState, useEffect } from "react";
import NameContainer from "./NameContainer";

export default function HeaderContainer(props) {
  const [state, setState] = useState("");

  useEffect(() => {
    if (props.pathName.indexOf("home") !== -1) setState("Trang chủ");
    if (props.pathName.indexOf("table-of-work") !== -1) setState("Bảng công");
    if (props.pathName.indexOf("report") !== -1) setState("Báo cáo");
    if (props.pathName.indexOf("project") !== -1) setState("Dự án");
    if (props.pathName.indexOf("works") !== -1) setState("Công việc");
    if (props.pathName.indexOf("account") !== -1) setState("Tài khoản");
  }, [props.pathName]);
  
  return (
    <div className="view_name">
      <i class="bx bx-menu" onClick={() => props.activeSidebar()}></i>
      <NameContainer name={state} />
    </div>
  );
}
