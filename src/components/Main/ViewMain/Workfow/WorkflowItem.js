import React from "react";
import { Link } from "react-router-dom";
import WorkflowIntruction from "./WorkflowIntruction";

export default function WorkflowItem({ data }) {
  const { projectName, issueId, type, issueType, issueName, toIssue } = data;
  switch (type) {
    case "project":
      console.log(data);
      return (
        <Link to={`/${toIssue}`} className="wf--item pointer">
          <div className="col">
            <WorkflowIntruction projectName={projectName} issueId={issueId} />
            <div className="wf--item-content">
              <p>{issueName}</p>
            </div>
          </div>
          <div className="col">
            <div className={`wf--item-type ${issueType}`}></div>
          </div>
        </Link>
      );

    default:
      return (
        <div className="wf--item pointer">
          <div className="col">
            <WorkflowIntruction projectName={projectName} issueId={issueId} />
            <div className="wf--item-content">
              <p>{issueName}</p>
            </div>
          </div>
          p
          <div className="col">
            <div className={`wf--item-type ${issueType}`}></div>
          </div>
        </div>
      );
  }
}
