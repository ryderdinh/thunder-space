import React, { useEffect, useRef } from "react";

export const IssueHistory = () => {
  //? Create Ref
  const scrollEnd = useRef(null);

  //? Create Effect
  useEffect(() => {
    scrollToBottom();
  }, []);

  //? Create Function
  const scrollToBottom = () => {
    scrollEnd.current.scrollTo(
      0,
      scrollEnd.current.scrollHeight - scrollEnd.current.clientHeight
    );
  };

  return (
    <div className="issue__item issue-main-history">
      <div className="title">Lịch sử</div>
      <div
        className="issue__item-box issue-history-box fl-col eb-scroll"
        ref={scrollEnd}
      >
        <div className="issue-history__item">
          <div className="user fl-row">
            <div className="user-avatar">
              <img
                src={require("assets/images/icons/user.svg").default}
                alt="avatar"
              />
            </div>
            <p className="user-name">{`${"Dinh Quang Anh"}:`}</p>
          </div>
          <div className="content">
            <div className="row">create issue - 12:20 CH 05/06/2021</div>
            <div className="row"></div>
          </div>
        </div>
        <div className="issue-history__item">
          <div className="user fl-row">
            <div className="user-avatar">
              <img
                src={require("assets/images/icons/user.svg").default}
                alt="avatar"
              />
            </div>
            <p className="user-name">{`${"Dinh Quang Anh"}:`}</p>
          </div>
          <div className="content">
            <div className="row">change status - 12:30 CH 05/06/2021</div>
            <div className="row">-{">"} progress</div>
          </div>
        </div>
        <div className="issue-history__item">
          <div className="user fl-row">
            <div className="user-avatar">
              <img
                src={require("assets/images/icons/user.svg").default}
                alt="avatar"
              />
            </div>
            <p className="user-name">{`${"Dinh Quang Anh"}:`}</p>
          </div>
          <div className="content">
            <div className="row">change status - 12:30 CH 05/06/2021</div>
            <div className="row">progress -{">"} testing </div>
          </div>
        </div>
      </div>
    </div>
  );
};
