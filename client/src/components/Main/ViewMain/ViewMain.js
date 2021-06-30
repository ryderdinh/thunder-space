import React from "react";
import ViewBox from "./ViewBox";
export default class ViewMain extends React.Component {
  render() {
    return (
      <div className="view_main">
        <div className="background-texture">
          <img src={require("assets/images/ellips5.svg").default} alt="" />
        </div>
        <div className="row">
          <ViewBox pathName={this.props.pathName} />
        </div>
      </div>
    );
  }
}
