import React from "react";
import WorkflowIntruction from "../../Workfow/WorkflowIntruction";
import IssueAction from "./IssueAction/IssueAction";
export const IssueMainInfomation = ({ projectCode, issueData }) => {
  return (
    <div className="issue-main-infomation">
      <WorkflowIntruction
        projectCode={projectCode}
        issueId={issueData.iid}
        issueCode={issueData.issueCode}
      />
      <div className="issue-name">
        <p>{issueData.issueName}</p>
      </div>
      <IssueAction />
    </div>
  );
};
