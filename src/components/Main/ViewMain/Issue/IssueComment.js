import React from "react";

function IssueComment() {
  return (
    <div className="issue__item issue-main-comment">
      <div className="title">Bình luận</div>
      <div className="issue__item-box issue-comment-box">
        <div className="issue-comment__item">
          <div className="user">
            <div className="user-avatar">
              <img src="" alt="avatar" />
            </div>
            <p className="user-name">{`${"Dinh Quang Anh"}:`}</p>
          </div>
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueComment;
