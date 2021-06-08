import React from "react";
import HeaderContainer from "./HeaderContainer/HeaderContainer";
import ViewMain from "./ViewMain/ViewMain";
import "../../App.css";
export default class Main extends React.Component {
  render() {
    return (
      <main>
        <div className="view-container">
          <HeaderContainer />
          <ViewMain pathName={this.props.pathName} />
        </div>
      </main>
    );
  }
}
