import React from "react";
export default class NameContainer extends React.Component {
  render() {
    return (
      <h2 className="view_name animate__animated animate__slideInDown">
        {this.props.name}
      </h2>
    );
  }
}
