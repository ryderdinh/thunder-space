import React from "react";

export default function WorkflowIntruction({
  projectCode,
  issueId,
  issueCode,
}) {
  switch (projectCode) {
    case undefined:
      return (
        <div className="wf--item-instruction">
          <div className="intruction-item">{issueCode}</div>
        </div>
      );

    default:
      return (
        <div className="wf--item-instruction">
          <div className="intruction-item">{projectCode}</div>
          <div className="icon icon-arrow">
            <img
              src={require("assets/images/icons/arrow.svg").default}
              alt="icon"
            />
          </div>
          <div className="intruction-item">{issueCode}</div>
        </div>
      );
  }
}
