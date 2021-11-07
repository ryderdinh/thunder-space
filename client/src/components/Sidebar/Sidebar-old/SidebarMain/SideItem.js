import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveSideBar, changeNameContainer } from "actions";
class SideItem extends React.Component {
  render() {
    const { dataLink, name, index, activeClass } = this.props;
    console.log(this.props);
    return (
      <li
        className={
          dataLink.itemPath.length === 0 ? activeClass : `${activeClass} box`
        }
        onClick={() => {
          this.props.changeNameContainer(name);
          this.props.setActiveSideBar(index);
        }}
      >
        {dataLink.itemPath.length === 0 ? (
          <NavLink to={dataLink.path} className="side_link">
            <p>{name}</p>
          </NavLink>
        ) : (
          <>
            <p className="side_link">{name}</p>
            <ul className="side_link-item">
              {dataLink.itemPath.map((item, i) => (
                <li key={i}>
                  <NavLink to={item.path}>{item.name}</NavLink>
                </li>
              ))}
            </ul>
          </>
        )}
      </li>
    );
  }
}

export default connect(null, { changeNameContainer, setActiveSideBar })(
  SideItem
);
