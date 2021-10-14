import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";

function IssueComment({ issueComment }) {
  //? Create State
  const [inputComment, setInputComment] = useState("");
  const [rowComment, setRowComment] = useState(1);

  //? Create Ref
  const scrollEnd = useRef(null);

  //? Create Effect
  useEffect(() => {
    scrollToBottom();
  }, []);

  //? Create Fction
  const handleInput = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        setInputComment("");
        setRowComment(1);
      }
    }
  };
  const scrollToBottom = () => {
    scrollEnd.current.scrollTo(
      0,
      scrollEnd.current.scrollHeight - scrollEnd.current.clientHeight
    );
  };

  return (
    <div className="issue__item issue-main-comment">
      <div className="title">Bình luận</div>
      <div
        className="issue__item-box issue-comment-box fl-col eb-scroll"
        ref={scrollEnd}
      >
        {issueComment.map((item, index) => (
          <div key={index} className="issue-comment__item">
            <div className="user fl-row">
              <div className="user-avatar">
                <img
                  src={require("assets/images/icons/user.svg").default}
                  alt="avatar"
                />
              </div>
              <p className="user-name">{`${item.username}:`}</p>
            </div>
            <div className="content">{item.comment}</div>
          </div>
        ))}
      </div>
      <div className="issue__item-box issue-send-box">
        <div className="issue-comment__item">
          <TextareaAutosize
            rows={rowComment}
            maxRows={6}
            placeholder="Nhập vào đây ..."
            value={inputComment}
            onKeyUp={handleInput}
            onChange={(e) => {
              console.log(e.target.value);
              setInputComment(e.target.value);
            }}
            className="eb-scroll"
            maxLength="600"
          />
          <div className="btn-send-box">
            <div className="btn-send">
              <img
                src={require("assets/images/icons/send.svg").default}
                alt="send"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueComment;
