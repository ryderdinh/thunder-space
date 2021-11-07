import React from "react";
import AccountItem from "./AccountItem";

export default class AccountAction extends React.Component {
  state = {
    nameItem: ["Thông báo", "Thông tin cá nhân", "Đăng xuất"],
    linkCpn: ["#", "/account", "#"],
  };
  render() {
    return (
      <ul className="account_action">
        {this.state.nameItem.map((item, index) => (
          <AccountItem
            key={index}
            num={index}
            to={this.state.linkCpn[index]}
            name={item}
          />
        ))}
      </ul>
    );
  }
}
