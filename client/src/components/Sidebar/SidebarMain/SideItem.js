import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveSideBar, changeNameContainer } from "../../../actions/index";
// import Cookies from "js-cookie";
class SideItem extends React.Component {
  render() {
    const { to, name, index } = this.props;
    return (
      <li
        className={this.props.activeClass}
        onClick={() => {
          this.props.changeNameContainer(name);
          this.props.setActiveSideBar(index);
        }}
      >
        <Link to={to} className="side_link">
          <p>{name}</p>
        </Link>
      </li>
    );
  }
}

export default connect(null, { changeNameContainer, setActiveSideBar })(
  SideItem
);
