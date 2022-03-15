import React from "react";
import QuillEditor from "../Editor/QuillEditor";

function IssueDescription(props) {
  return (
    <div className="issue__item issue-main-description">
      <div className="title">Mô tả</div>
      <div className="issue__item-box issue-description-box">
        <QuillEditor
          description={props.description}
          handleDescription={props.handleDescription}
          placeholder="Nhập vào đây..."
        />
      </div>
    </div>
  );
}

export default IssueDescription;
