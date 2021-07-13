import React from "react";
import HeaderContainer from "./HeaderContainer/HeaderContainer";
import ViewMain from "./ViewMain/ViewMain";
import "../../App.css";
import { connect } from "react-redux";
export class Main extends React.Component {
  render() {
    return (
      <main className={this.props.blur ? "onblur" : ""}>
        <div className="view-container">
          <HeaderContainer
            pathName={this.props.pathName}
            activeSidebar={this.props.activeSidebar}
          />
          <ViewMain pathName={this.props.pathName} />
        </div>
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  blur: state._popup.blur,
});
export default connect(mapStateToProps, null)(Main);
