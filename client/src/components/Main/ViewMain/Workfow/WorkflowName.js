import React from "react";

export default function WorkflowName({ name }) {
  return (
    <div className="wf--name pointer">
      <p>{name}</p>
      <div className="icon icon-arrow">
        <img
          src={require("assets/images/icons/arrow.svg").default}
          alt="icon"
        />
      </div>
    </div>
  );
}
