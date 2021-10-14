import React, { useState } from "react";
const IssueAction = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, setstate] = useState([
    { class: "edit", name: "Sửa" },
    { class: "assign", name: "Giao" },
    { class: "status", name: "Trạng thái" },
    { class: "add", name: "Thêm" },
  ]);
  return (
    <div className="issue-action fl-row">
      {state.map((item) => (
        <div key={item.class} className={`issue-action__item ${item.edit}`}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default IssueAction;
