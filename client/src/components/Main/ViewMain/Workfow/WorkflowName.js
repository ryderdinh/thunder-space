import React from "react";
import { Link } from "react-router-dom";

export default function WorkflowName({ name, path }) {
  return (
    <div className="wf--name pointer">
      <Link to={path}>
        <p>{name}</p>
      </Link>
      <div className="icon icon-arrow">
        <img
          src={require("assets/images/icons/arrow.svg").default}
          alt="icon"
        />
      </div>
    </div>
  );
}
