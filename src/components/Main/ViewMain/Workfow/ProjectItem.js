import React from "react";
import WorkflowItem from "./WorkflowItem";

export default function ProjectItem({ data }) {
  return (
    <div className="wf-list fl-col">
      {data.map((project) =>
        project.projectIssue.map((issue) => (
          <WorkflowItem
            key={issue.iid}
            data={{
              type: "project",
              projectName: project.projectName,
              issueId: issue.iid,
              issueName: issue.issueName,
              issueType: `iss-${issue.issueType}`,
              toIssue: `project/${project.pid}/${issue.iid}`,
            }}
          />
        ))
      )}
    </div>
  );
}
