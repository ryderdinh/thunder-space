import React from "react";

export default function WorkflowIssueName({ name }) {
  return (
    <div className="issue--name pointer">
      <p>
        Issue: <span>{name}</span>
      </p>
    </div>
  );
}
