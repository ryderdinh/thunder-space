import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Wf.css";
import WorkflowAction from "./WorkflowAction";
import WorkflowName from "./WorkflowName";
import ProjectItem from "./ProjectItem";

export default function ProjectContainer() {
  let { pid } = useParams();
  // let { pathname } = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    workflowName: "Tất cả",
    dataProject: [
      {
        pid: "jjjefnjnjkef",
        projectCode: "ff1",
        projectName: "TestPJ",
        projectManager: [{ uid: "vsrbkhjv", username: "Quang Anh" }],
        projectMember: [
          { uid: "vsrbkhjv", username: "Quang Anh" },
          { uid: "wdwdkhjv", username: "Quoc Anh" },
        ],
        projectIssue: [
          {
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
        ],
      },
      {
        pid: "kejsjesfjkjkesf",
        projectCode: "ff2",
        projectName: "TestPJ1",
        projectManager: [{ uid: "vsrbkhjv", username: "Quang Anh" }],
        projectMember: [
          { uid: "vsrbkhjv", username: "Quang Anh" },
          { uid: "wdwdkhjv", username: "Quoc Anh" },
        ],
        projectIssue: [
          {
            iid: "bhefkjek",
            issueName: "Lỗi trang đăng nhập",
            issueDescription:
              "Tạo trang đăng nhập cho ứng dụng zxsTạo trang đăng nhập cho ứng dụng zxsTạo trang đăng nhập cho ứng dụng zxsTạo trang đăng nhập cho ứng dụng zxs",
            issueType: "bug",
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
        ],
      },
    ],
  });
  useEffect(() => {
    if (pid === undefined) {
      setState((prevState) => ({ ...prevState, workflowName: "Tất cả" }));
    } else {
      setState((prevState) => ({
        ...prevState,
        workflowName: prevState.dataProject[0].projectName,
      }));
    }
  }, [pid]);
  return (
    <div className="wf-container project">
      <div className="row fl-row al-center">
        <WorkflowName type="project" name={state.workflowName} />
        <div className="wf-action">
          <WorkflowAction type="filter" />
          <WorkflowAction type="reload" />
        </div>
      </div>
      <div className="row fl-col">
        <div className="wf-main fl-col">
          <ProjectItem data={state.dataProject} />
          <div className="wf-pagination"></div>
        </div>
      </div>
    </div>
  );
}
