import React from "react";
import HeaderContainer from "./HeaderContainer/HeaderContainer";
import ViewMain from "./ViewMain/ViewMain";
import "../../App.css";
export default class Main extends React.Component {
  render() {
    return (
      <main>
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
