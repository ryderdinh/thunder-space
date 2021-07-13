import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import WorkflowIssueName from "../Workfow/WorkflowIssueName";
import WorkflowAction from "../Workfow/WorkflowAction";
import WorkflowIntruction from "../Workfow/WorkflowIntruction";
import WorkflowName from "../Workfow/WorkflowName";
import IssueDetail from "./IssueDetail";
import IssueDescription from "./IssueDescription";
import IssueComment from "./IssueComment";

export default function IssueDetailContainer() {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    projectCode: "ff1",
    projectName: "TestPJ",
    issueData: {
      iid: "bhefkjek",
      issueName: "Tạo trang đăng nhập cho ứng dụng zxs",
      issueDescription:
        "Tạo trang đăng nhập cho ứng dụng zxsTạo trang đăng nhập cho ứng dụng zxsTạo trang đăng nhập cho ứng dụng zxsTạo trang đăng nhập cho ứng dụng zxs",
      issueType: "task",
      issueCreator: { uid: "vsrbkhjv", username: "Quang Anh" },
      issueAssign: { uid: "wdwdkhjv", username: "Quoc Anh" },
      issueTime: {
        start: "12:00,11/20/2021",
        end: "14:00,11/20/2021",
        set: "20:00,11/20/2021",
      },
      issuePriority: "Medium",
      issueAttackment: "",
      issueComment: [
        {
          time: "12:00,11/20/2021",
          username: "Quang Anh",
          comment: "akbjsdvjsv jkskv",
        },
      ],
      issueStatus: "CLOSED",
      issueHistory: [
        {
          time: "12:00,11/20/2021",
          username: "Quang Anh",
          action: "change",
          from: "",
          to: "",
        },
      ],
    },
  });

  let { iid } = useParams();
  console.log(iid);
  // const instanceRef = useRef(null);

  return (
    <div className="wf-container project">
      <div className="row fl-row al-center">
        <WorkflowName type="project" name={"state.workflowName"} />
        <WorkflowIssueName name={state.issueData.issueName} />
        <div className="wf-action">
          <WorkflowAction type="filter" />
          <WorkflowAction type="reload" />
        </div>
      </div>
      <div className="row fl-col">
        <div className="wf-main fl-row">
          <div className="col">
            <div className="issue-main-infomation">
              <WorkflowIntruction
                projectName={state.projectName}
                issueId={state.issueData.iid}
              />
              <div className="issue-name">
                <p>{state.issueData.issueName}</p>
              </div>
              <div className="issue-action-box">
                <div className="issue-action">Sửa</div>
                <div className="issue-action">Giao</div>
                <div className="issue-action">Trạng thái</div>
                <div className="issue-action">Thêm</div>
              </div>
            </div>
            <IssueDetail />
          </div>
          <div className="col">
            <IssueDescription />
            <IssueComment />
          </div>
        </div>
      </div>
    </div>
  );
}
