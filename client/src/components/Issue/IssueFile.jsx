import React from "react";

export const IssueFile = () => {
  return (
    <div className="issue__item issue-main-attachment">
      <div className="title">Đính kèm</div>
      <div className="issue__item-box issue-file-box fl-row">
        <div className="issue-file__item fl-row">
          <img
            src={require("assets/images/icons/file.svg").default}
            alt="file"
          />
          <div className="issue-file__name">test.png</div>
        </div>
        <div className="issue-file__item fl-row">
          <img
            src={require("assets/images/icons/file.svg").default}
            alt="file"
          />
          <div className="issue-file__name">test</div>
        </div>
        <div className="issue-file__item fl-row">
          <img
            src={require("assets/images/icons/file.svg").default}
            alt="file"
          />
          <div className="issue-file__name">test</div>
        </div>
      </div>
    </div>
  );
};
