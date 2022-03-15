import React from "react";

export default function IssueDetail({
  issueStatus,
  issuePriority,
  issueTime,
  issueAssign,
  issueCreator,
  issueType,
}) {
  let charAtOne = (content) => {
    return content.charAt(0).toUpperCase() + content.slice(1);
  };
  return (
    <div className="issue__item issue-main-detail">
      <div className="title">Chi tiết</div>
      <div className="issue__item-box issue-detail-box">
        <div className="issue-detail__item fl-row">
          <div className="issue-detail__label">Loại:</div>
          <div className="issue-detail__data type fl-row">
            <div className={`wf--item-type iss-${issueType}`}></div>
            <div className="letter">{charAtOne(issueType)}</div>
          </div>
        </div>
        <div className="issue-detail__item fl-row">
          <div className="issue-detail__label">Độ ưu tiên:</div>
          <div className="issue-detail__data prioritize medium">
            {charAtOne(issuePriority)}
          </div>
        </div>
        <div className="issue-detail__item fl-row">
          <div className="issue-detail__label">Trạng thái:</div>
          <div className="issue-detail__data normal">
            {charAtOne(issueStatus)}
          </div>
        </div>
        <div className="issue-detail__item fl-row">
          <div className="issue-detail__label">Người tạo:</div>
          <div className="issue-detail__data normal">
            {issueCreator.username}
          </div>
        </div>
        <div className="issue-detail__item fl-row">
          <div className="issue-detail__label">Người được giao:</div>
          <div className="issue-detail__data normal">
            {issueAssign.username}
          </div>
        </div>
        <div className="issue-detail__item fl-row">
          <div className="issue-detail__label">Ngày tạo:</div>
          <div className="issue-detail__data date fl-col">
            <p>{issueTime.set.hour}</p>
            <p>{issueTime.set.date}</p>
          </div>
        </div>
        <div className="issue-detail__item fl-row">
          <div className="issue-detail__label">Ngày kết thúc:</div>
          <div className="issue-detail__data date fl-col">
            <p>{issueTime.end.hour}</p>
            <p>{issueTime.end.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
