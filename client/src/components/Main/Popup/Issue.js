import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { closePopup } from "actions";
import { enGB } from "date-fns/locale";
import { DatePicker, useDateInput } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import QuillEditor from "../ViewMain/Editor/QuillEditor";
import axios from "axios";
import { getAllCookie } from "units/cookieWeb";

function useOutside(ref, order, unActiveDropdown) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        unActiveDropdown(order);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function Issue({ dataPopup }) {
  //? Create State
  const [state, setState] = useState({
    dataIssueInput: [
      { label: "Tên issue", value: "", placeholder: "Nhập tên issue" },
    ],
    dataIssueInputMulti: [
      {
        label: "Project",
        value: "",
        placeholder: "Chọn dự án",
        multiValue: [],
        activeDropdown: "",
      },
      {
        label: "Kiểu",
        value: "",
        placeholder: "Chọn kiểu issue",
        multiValue: [
          { id: 1, value: "Task" },
          { id: 2, value: "Bug" },
        ],
        activeDropdown: "",
      },
      {
        label: "Ưu tiên",
        value: "",
        placeholder: "Chọn mức độ ưu tiên",
        multiValue: [
          { id: 1, value: "Low" },
          { id: 2, value: "Medium" },
          { id: 3, value: "High" },
          { id: 4, value: "Highest" },
        ],
        activeDropdown: "",
      },
      {
        label: "Người được giao",
        value: "",
        placeholder: "Chọn người được giao",
        multiValue: [],
        activeDropdown: "",
      },
    ],
    dataIssueInputDate: [
      { label: "Gia hạn", value: "", placeholder: "Hạn kết thúc" },
    ],
    dataIssueInputAttactment: [{ label: "Đính kèm tệp" }],
    dataIssueInputDescription: [
      { label: "Mô tả", value: "", placeholder: "Nhập mô tả" },
    ],
    readOnly: false,
  });

  //? Connect Redux
  const dispatch = useDispatch();
  //? Create Effect
  useEffect(() => {
    const { id, token } = getAllCookie();
    (async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `https://hrmadmin.herokuapp.com/api/projectInfo/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.data.hasOwnProperty("status")) {
          setState((prevState) => ({
            ...prevState,
            dataIssueInputMulti: [
              ...prevState.dataIssueInputMulti.map((item, index) => {
                if (index === 0) item.multiValue = [...res.data];
                return item;
              }),
            ],
          }));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //? Create Function
  const handleDataIssueChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      dataIssueInput: [
        ...prevState.dataIssueInput.map((item, index) => {
          if (index === value.order) item.value = value.blhex;
          return item;
        }),
      ],
    }));
  };
  const handleClosePopup = () => {
    dispatch(closePopup());
  };
  const toggleActiveDropdownMultipleValueInput = (value) => {
    setState((prevState) => ({
      ...prevState,
      dataIssueInputMulti: [
        ...prevState.dataIssueInputMulti.map((item, index) => {
          if (index === value.order) item.activeDropdown = value.blhex;
          return item;
        }),
      ],
    }));
  };
  const setDropdownMultipleValueInput = (value) => {
    setState((prevState) => ({
      ...prevState,
      value: [
        ...prevState.dataIssueInputMulti.map((item, index) => {
          if (index === value.order) item.value = value.blhex;
          return item;
        }),
      ],
    }));
    if (value.order === 0) setMemberProjectSelect(value.pcode);
  };
  const setMemberProjectSelect = async (pcode) => {
    const { id, token } = getAllCookie();
    setState((prevState) => ({
      ...prevState,
      dataIssueInputMulti: [
        ...prevState.dataIssueInputMulti.map((item, index) => {
          if (index === 3) item.multiValue = [];
          return item;
        }),
      ],
    }));
    try {
      const res = await axios({
        method: "GET",
        url: `https://hrmadmin.herokuapp.com/api/projectInfo/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { search: "member", projectCode: pcode },
      });
      if (!res.data.hasOwnProperty("status")) {
        setState((prevState) => ({
          ...prevState,
          dataIssueInputMulti: [
            ...prevState.dataIssueInputMulti.map((item, index) => {
              if (index === 3) item.multiValue = [...res.data];
              return item;
            }),
          ],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDescription = (content) => {
    setState((prevState) => ({
      ...prevState,
      dataIssueInputDescription: [
        ...prevState.dataIssueInputDescription.map((item, index) => {
          if (index === 0) item.value = content;
          return item;
        }),
      ],
    }));
  };

  return (
    <div className="popup__issue">
      <form className="popup__issue__form">
        <div className="popup__issue__form--col">
          {state.dataIssueInput.map((item, index) => (
            <IssueItem
              key={index}
              order={index}
              dataItem={item}
              readOnly={state.readOnly}
              handleDataIssueChange={handleDataIssueChange}
            />
          ))}
          {state.dataIssueInputMulti.map((item, index) => (
            <IssueItemMultiple
              key={index}
              order={index}
              dataItem={item}
              readOnly={state.readOnly}
              toggleActive={toggleActiveDropdownMultipleValueInput}
              setValue={setDropdownMultipleValueInput}
              setMember={setMemberProjectSelect}
            />
          ))}
          {state.dataIssueInputDate.map((item, index) => (
            <IssueItemDate
              key={index}
              order={index}
              dataItem={item}
              readOnly={state.readOnly}
            />
          ))}
          {state.dataIssueInputAttactment.map((item, index) => (
            <IssueItemAttachment
              key={index}
              order={index}
              dataItem={item}
              readOnly={state.readOnly}
            />
          ))}
        </div>
        <div className="popup__issue__form--col">
          {state.dataIssueInputDescription.map((item, index) => (
            <IssueItemDescription
              key={index}
              order={index}
              dataItem={item}
              readOnly={state.readOnly}
              handleDescription={handleDescription}
            />
          ))}
        </div>
      </form>
      <div className="popup__issue__btn-box">
        <div className="issue__btn">Xác nhận</div>
        <div
          className="issue__btn"
          onClick={() => {
            handleClosePopup();
          }}
        >
          Huỷ
        </div>
      </div>
    </div>
  );
}

const IssueItem = ({ order, dataItem, readOnly, ...props }) => {
  return (
    <label className="popup__issue__item">
      <p className="popup__issue__label">{dataItem.label}</p>
      <div className="popup__issue__input-box fl-col">
        <div className="popup__issue__input-box__item">
          <input
            type="text"
            value={dataItem.value}
            className="popup__issue__input"
            name="name-project"
            placeholder={dataItem.placeholder}
            readOnly={readOnly}
            onChange={(e) => {
              props.handleDataIssueChange({ blhex: e.target.value, order });
            }}
          />
        </div>

        <div className="popup__issue__noti"></div>
      </div>
    </label>
  );
};

const IssueItemMultiple = ({ order, dataItem, readOnly, ...props }) => {
  const dropdown = useRef();
  const unActiveDropdown = (value) => {
    props.toggleActive({ order, blhex: "" });
  };
  useOutside(dropdown, order, unActiveDropdown);
  const checkOrder = (data, orderValue) => {
    switch (orderValue) {
      case 0: {
        return data.multiValue === undefined || data.multiValue.length === 0 ? (
          <div className="issue__dropdown__loading">
            <img
              src={
                require("assets/bower_components/SVG-Loaders/svg-loaders/puff.svg")
                  .default
              }
              alt="loading"
            />
          </div>
        ) : (
          data.multiValue.map((item) => (
            <li
              className="issue__dropdown__li"
              key={item.projectId}
              onClick={() => chooseItem(item.projectName, item.projectCode)}
            >
              <div className="issue__dropdown__content">{item.projectName}</div>
            </li>
          ))
        );
      }

      case 1:
      case 2:
        return data.multiValue.map((item) => (
          <li
            className="issue__dropdown__li"
            key={item.id}
            onClick={() => chooseItem(item.value)}
          >
            <div className="issue__dropdown__content">{item.value}</div>
          </li>
        ));

      case 3:
        return data.multiValue.length === 0 ? (
          <div className="issue__dropdown__loading">
            <img
              src={
                require("assets/bower_components/SVG-Loaders/svg-loaders/puff.svg")
                  .default
              }
              alt="loading"
            />
          </div>
        ) : (
          data.multiValue.map((item) => (
            <li
              className="issue__dropdown__li"
              key={item.id}
              onClick={() => chooseItem(item.name)}
            >
              <div className="issue__dropdown__img">
                <img
                  src="https://i.pinimg.com/originals/13/05/10/130510692cd97771e475581cc4253669.png"
                  alt="avatar"
                />
              </div>
              <div className="issue__dropdown__content">{item.name}</div>
            </li>
          ))
        );

      default:
        return "";
    }
  };
  const chooseItem = (value, pcode) => {
    if (order === 0) {
      props.setValue({ order, blhex: value, pcode });
    } else props.setValue({ order, blhex: value });
  };

  return (
    <label className="popup__issue__item">
      <p className="popup__issue__label">{dataItem.label}</p>
      <div className="popup__issue__input-box fl-col">
        <div
          className="popup__issue__input-box__item"
          onClick={() => {
            let classBlhex = "";
            if (dataItem.activeDropdown === "") classBlhex = "active";
            props.toggleActive({ order, blhex: classBlhex });
          }}
        >
          <input
            type="text"
            value={dataItem.value}
            className="popup__issue__input select"
            placeholder={dataItem.placeholder}
            readOnly={true}
          />
          <img
            src={require("assets/images/icons/arrow-bottom.svg").default}
            alt="arrow"
            className={`popup__issue__image ${dataItem.activeDropdown}`}
          />
        </div>
        <div className="popup__issue__noti"></div>
        <div
          className={`popup__issue__dropdown ${dataItem.activeDropdown}`}
          ref={dropdown}
        >
          <ul className="issue__dropdown__ul">{checkOrder(dataItem, order)}</ul>
        </div>
      </div>
    </label>
  );
};

const IssueItemDate = ({ order, dataItem, readOnly }) => {
  const [date, setDate] = useState();
  const timeInputProps = useDateInput({
    date,
    format: "HH:mm",
    locale: enGB,
    onDateChange: setDate,
  });
  return (
    <label className="popup__issue__item">
      <p className="popup__issue__label">{dataItem.label}</p>
      <div className="popup__issue__input-box fl-col">
        <div className="popup__issue__input-box__item date">
          <DatePicker
            date={date}
            onDateChange={setDate}
            locale={enGB}
            format="dd/MM/yyyy"
          >
            {({ inputProps, focused }) => (
              <input
                className={"input" + (focused ? " -focused" : "")}
                style={{ width: "99%" }}
                {...inputProps}
              />
            )}
          </DatePicker>{" "}
          <input
            className="input"
            style={{ width: "30%" }}
            {...timeInputProps}
          />
        </div>

        <div className="popup__issue__noti"></div>
      </div>
    </label>
  );
};

const IssueItemAttachment = ({ order, dataItem, readOnly }) => {
  return (
    <label className="popup__issue__item">
      <p className="popup__issue__label">{dataItem.label}</p>
      <div className="popup__issue__input-box fl-col">
        <div className="popup__issue__input-box__item file">
          <img
            src={require("assets/images/icons/plus.svg").default}
            alt="file"
          />
          <input type="file" className="popup__issue__input file" />
        </div>
        <div className="popup__issue__noti"></div>
      </div>
    </label>
  );
};

const IssueItemDescription = ({ order, dataItem, readOnly, ...props }) => {
  return (
    <label className="popup__issue__item editor">
      <p className="popup__issue__label">{dataItem.label}</p>
      <div className="popup__issue__input-box fl-col">
        <div className="popup__issue__input-box__item editor">
          <QuillEditor
            description={dataItem.value}
            handleDescription={props.handleDescription}
            placeholder="Nhập vào đây..."
            readOnly={readOnly}
          />
        </div>
        <div className="popup__issue__noti"></div>
      </div>
    </label>
  );
};
