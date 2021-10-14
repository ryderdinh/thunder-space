import React from "react";
import AccountInfo from "./AccountInfo";
import AccountAction from "./AccountAction/AccountAction";
export default class AccountMain extends React.Component {
  render() {
    return (
      <div className="account_main">
        <AccountInfo/>
        <AccountAction/>        
      </div>
    );
  }
}
