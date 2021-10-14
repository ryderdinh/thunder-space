import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import WorkflowIssueName from "../Workfow/WorkflowIssueName";
import WorkflowAction from "../Workfow/WorkflowAction";
// import WorkflowIntruction from "../Workfow/WorkflowIntruction";
import WorkflowName from "../Workfow/WorkflowName";
import IssueDetail from "./IssueDetail";
import IssueDescription from "./IssueDescription";
import "./Issue.css";
import IssueComment from "./IssueComment";
import { IssueFile } from "./IssueFile";
import { IssueHistory } from "./IssueHistory";
import { IssueMainInfomation } from "./IssueMainInfomation/IssueMainInfomation";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataIssue } from "actions";
import axios from "axios";
import { getAllCookie } from "units/cookieWeb";
import toast from "react-hot-toast";

export default function Issue() {
  //? Create State
  const [componentData, setComponentData] = useState({ toWf: "", nameWf: "" });

  //? Connect Redux
  const state = useSelector((state) => state._issue._dataIssue);
  const dispatch = useDispatch();

  //? Get Search
  let search = useLocation().search;

  //? Create Effect
  useEffect(() => {
    (async () => {
      let prms = new URLSearchParams(search);
      let prmsName = prms.get("wfi");
      if (prmsName !== "") prmsName = await getNameProjectParent(prmsName);
      else prmsName = "Tất cả";

      setComponentData((prevState) => ({
        ...prevState,
        toWf: `/${prms.get("wftype")}/${prms.get("wfi")}`,
        nameWf: prmsName,
      }));
    })();
  }, [search]);

  //? Create Function
  const handleDescription = (value) => {
    dispatch(
      setDataIssue({
        ...state,
        issueData: { ...state.issueData, issueDescription: value },
      })
    );
  };
  const getNameProjectParent = async (pcode) => {
    const { id, token } = getAllCookie();
    let resultText;
    try {
      const res = await axios({
        method: "GET",
        url: `https://hrmadmin.herokuapp.com/api/projectInfo/${id}?projectCode=${pcode}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let dataResult = res.data;
      if (dataResult.hasOwnProperty("status")) {
        toast.error(`${dataResult.status}`);
        resultText = "1";
      } else {
        console.log(dataResult[0].projectName);
        resultText = dataResult[0].projectName;
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi");
      resultText = "2";
    }
    return resultText;
  };
  // let { iid } = useParams();
  // console.log(iid);
  // const instanceRef = useRef(null);

  return (
    <div className="wf-container project">
      <div className="wf-header row fl-row al-center">
        <WorkflowName name={componentData.nameWf} path={componentData.toWf} />
        <WorkflowIssueName name={state.issueData.issueName} />
        <div className="wf-action">
          <WorkflowAction type="filter" />
          <WorkflowAction type="reload" />
        </div>
      </div>
      <div className="wf-body--issue row fl-col">
        <div className="wf-main fl-row wf-issue-container">
          <div className="col">
            <IssueMainInfomation
              projectCode={state.projectCode}
              issueData={state.issueData}
            />
            <IssueDetail
              issueType={state.issueData.issueType}
              issuePriority={state.issueData.issuePriority}
              issueStatus={state.issueData.issueStatus}
              issueCreator={state.issueData.issueCreator}
              issueAssign={state.issueData.issueAssign}
              issueTime={state.issueData.issueTime}
            />
          </div>
          <div className="col">
            <IssueDescription
              description={state.issueData.issueDescription}
              handleDescription={handleDescription}
            />
            <IssueFile />
            <IssueComment issueComment={state.issueData.issueComment} />
            <IssueHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
