import React from "react";
import SideItem from "./SideItem";
import { connect } from "react-redux";
import { fetchMenus } from "actions";

class SidebarMenu extends React.Component {
  state = {
    linkSide: ["/", "/table-of-work", "/report","/workflow"],
  };
  componentDidMount() {
    this.props.fetchMenus();
  }

  render() {
    const { sideItemName, tagIndex } = this.props;
    return (
      <nav className="sidebar_menu">
        <ul className="side">
          {sideItemName.map((name, index) => (
            <SideItem
              key={index}
              to={this.state.linkSide[index]}
              name={name}
              index={index}
              activeClass={
                tagIndex === index ? "side_item active" : "side_item"
              }
            ></SideItem>
          ))}
        </ul>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sideItemName: state.side_item_name,
    tagIndex: state.indexActiveSidebar._activeIndex,
  };
};
export default connect(mapStateToProps, { fetchMenus })(SidebarMenu);
