import React from "react";

export default function IssueDetail() {
  return (
    <div className="issue__item issue-main-detail">
      <div className="title">Chi tiết</div>
      <div className="issue__item-box issue-detail-box">
        <div className="issue-detail__item">
          <div className="issue-detail__label">Loại</div>
          <div className="issue-detail__data type">
            <div className="phenotypic task"></div>
            <div className="letter">Task</div>
          </div>
        </div>
        <div className="issue-detail__item">
          <div className="issue-detail__label">Độ ưu tiên:</div>
          <div className="issue-detail__data prioritize medium">Medium</div>
        </div>
        <div className="issue-detail__item">
          <div className="issue-detail__label">Trạng thái:</div>
          <div className="issue-detail__data normal">Testing</div>
        </div>
        <div className="issue-detail__item">
          <div className="issue-detail__label">Người tạo:</div>
          <div className="issue-detail__data normal">Dinh Quang Anh</div>
        </div>
        <div className="issue-detail__item">
          <div className="issue-detail__label">Người được giao:</div>
          <div className="issue-detail__data normal">Dinh Quang Anh</div>
        </div>
        <div className="issue-detail__item">
          <div className="issue-detail__label">Ngày tạo:</div>
          <div className="issue-detail__data date">
            <p>12:20 CH</p>
            <p>05/06/2021</p>
          </div>
        </div>
        <div className="issue-detail__item">
          <div className="issue-detail__label">Ngày kết thúc:</div>
          <div className="issue-detail__data date">
            <p>12:20 CH</p>
            <p>05/06/2021</p>
          </div>
        </div>
      </div>
    </div>
  );
}
