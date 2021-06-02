import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeNameContainer } from "../../../../actions";
import { removeCookie } from "../../../../units/cookieWeb";
export class AccountItem extends React.Component {
  checkOut = (value) => {
    if (value === 1) {
      removeCookie(true, true);
      window.location.href = "https://zelios-sea.netlify.app/";
    } else {
      this.props.changeNameContainer("Thông tin cá nhân");
    }
  };
  render() {
    const { to, name, num } = this.props;
    return (
      <li className="account_item">
        <Link
          to={to}
          className="account_link"
          onClick={() => {
            this.checkOut(num);
          }}
        >
          <div className="dot"></div>
          <p>{name}</p>
        </Link>
      </li>
    );
  }
}

export default connect(null, { changeNameContainer })(AccountItem);
