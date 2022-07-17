import React from "react";
export default class Button extends React.Component {
  render() {
    const { className, content } = this.props;
    return <div className={className} >{content}</div>;
  }
}
