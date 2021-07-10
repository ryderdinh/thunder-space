import React from "react";

export default function WorkflowIntruction({ projectName, issueId }) {
  switch (projectName) {
    case undefined:
      return (
        <div className="wf--item-instruction">
          <div className="intruction-item">{issueId}</div>
        </div>
      );

    default:
      return (
        <div className="wf--item-instruction">
          <div className="intruction-item">{projectName}</div>
          <div className="icon icon-arrow">
            <img
              src={require("assets/images/icons/arrow.svg").default}
              alt="icon"
            />
          </div>
          <div className="intruction-item">{issueId}</div>
        </div>
      );
  }
}
