import React from "react";
export default class NameContainer extends React.Component {
  render() {
    return (
      <span className="name">
        {this.props.name}
      </span>
    );
  }
}
