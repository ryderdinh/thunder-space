import React from "react";
import ViewBox from "./ViewBox";
export default class ViewMain extends React.Component {
  render() {
    return (
      <div className="view_main">
        <div className="background-texture">
          <img src="./images/ellips5.svg" alt="" />
        </div>
        <div className="row">
          <ViewBox />
        </div>
      </div>
    );
  }
}
