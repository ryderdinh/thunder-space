import React from "react";
import Filter from "assets/images/icons/filter.svg";
import Reload from "assets/images/icons/reload.svg";
export default function WorkflowAction({ type }) {
  switch (type) {
    case "filter":
      return (
        <div className={`wf-action--item ${type} pointer`}>
          <img src={Filter} alt="icon" />
        </div>
      );
    case "reload":
      return (
        <div className={`wf-action--item ${type} pointer`}>
          <img src={Reload} alt="icon" />
        </div>
      );
    default:
      return (
        <div className={`wf-action--item ${type} pointer`}>
          <img src={Reload} alt="icon" />
        </div>
      );
  }
}
