import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeCookie } from "units/cookieWeb";
import { changeNameContainer } from "actions";
export class AccountItem extends React.Component {
  checkOut = (value) => {
    switch (value) {
      case 0: {
        this.props.changeNameContainer("Thông tin cá nhân");
        break;
      }
      case 1: {
        break;
      }
      case 2: {
        removeCookie(true, true);
        window.location.href = "https://zelios-sea.netlify.app/";
        break;
      }
      default:
        break;
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
