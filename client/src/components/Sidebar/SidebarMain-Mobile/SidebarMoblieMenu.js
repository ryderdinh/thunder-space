import React, { Component } from "react";
import { connect } from "react-redux";
import SideMobileItem from "./SideMobileItem";
import { fetchMenus } from "../../../actions/index";
export class SidebarMoblieMenu extends Component {
  state = {
    icon: [
      "fas fa-home",
      "fas fa-table",
      "fas fa-file-signature",
      "fas fa-user",
    ],
    title: ["Trang chủ", "Bảng công", "Báo cáo", "Thông tin cá nhân"],
    to: ["/home", "/table-of-work", "/report", "/info-account"],
  };
  componentDidMount() {
    this.props.fetchMenus();
  }

  render() {
    const { tagIndex } = this.props;
    return (
      <ul className="menu-mobile-list  animate__animated animate__fadeInUp">
        {this.state.title.map((el, index) => (
          <SideMobileItem
            key={index}
            index={index}
            clsName={tagIndex === index ? "side_item active" : "side_item"}
            title={el}
            icon={this.state.icon[index]}
            to={this.state.to[index]}
          />
        ))}
        <div class="indicator"></div>
      </ul>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tagIndex: state.indexActiveSidebar._activeIndex,
  };
};
export default connect(mapStateToProps, { fetchMenus })(SidebarMoblieMenu);
