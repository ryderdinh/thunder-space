import React from "react";
export default class ViewBoxName extends React.Component {
  render() {
    return (
      <div className="view-box_nme animate__animated animate__fadeInLeft">
        {this.props.name}
      </div>
    );
  }
}
