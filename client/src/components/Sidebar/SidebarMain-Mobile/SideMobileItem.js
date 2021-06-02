import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveSideBar, changeNameContainer } from "../../../actions";

export class SideMobileItem extends Component {
  render() {
    const { icon, title, to, index, clsName } = this.props;
    return (
      <li
        className={clsName}
        onClick={() => {
          this.props.setActiveSideBar(index);
          this.props.changeNameContainer(title);
        }}
      >
        <Link to={to}>
          <span className="icon">
            <i className={icon}></i>
          </span>
          <span className="title">{title}</span>
        </Link>
      </li>
    );
  }
}

export default connect(null, { setActiveSideBar, changeNameContainer })(
  SideMobileItem
);
