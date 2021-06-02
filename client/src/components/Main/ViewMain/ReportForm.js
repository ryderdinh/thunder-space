import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { actSendReport } from "../../../actions";

export class ReportForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      halfDay: "col setDate d-none",
      severalDays: "col setDate",
      start: "",
      end: "",
      date: "",
      reportContent: "",
      act1: "",
      act2: "active",
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleTextarea = this.handleTextarea.bind(this);
  }
  checkNow = (value, type) => {
    let now = Number(moment().format("YYYYMMDD"));
    let current = parseInt(value.replace(/-/g, ""), 10);
    if (type) {
      let check = now > current ? false : true;
      return check;
    } else {
      let check = now >= current ? false : true;
      return check;
    }
  };
  handleChangeStart = (e) => {
    if (this.checkNow(e.target.value, true)) {
      if (this.state.end !== "") {
        let start = e.target.value;
        let end = this.state.end;
        if (
          parseInt(start.replace(/-/g, ""), 10) <
          parseInt(end.replace(/-/g, ""), 10)
        )
          this.setState({ start: e.target.value });
      } else this.setState({ start: e.target.value });
    }
  };
  handleChangeEnd = (e) => {
    if (this.checkNow(e.target.value, false)) {
      if (this.state.start !== "") {
        let start = this.state.start;
        let end = e.target.value;
        if (
          parseInt(start.replace(/-/g, ""), 10) <
          parseInt(end.replace(/-/g, ""), 10)
        )
          this.setState({ end: e.target.value });
      } else this.setState({ end: e.target.value });
    }
  };
  handleChangeDate = (e) => {
    if (this.checkNow(e.target.value, true)) {
      this.setState({
        date: e.target.value,
      });
    }
  };
  handleTextarea = (e) => {
    this.setState({
      reportContent: e.target.value,
    });
  };
  setTypeReport = (value) => {
    switch (value) {
      case true:
        this.setState({
          halfDay: "col setDate",
          severalDays: "col setDate d-none",
          act1: "active",
          act2: "",
        });
        break;
      case false:
        this.setState({
          halfDay: "col setDate d-none",
          severalDays: "col setDate",
          act1: "",
          act2: "active",
        });
        break;
      default: {
        break;
      }
    }
  };
  render() {
    return (
      <div className="report-form animate__animated animate__zoomIn">
        <div className="row">
          <div className="col choose-type">
            <input
              className={this.state.act1}
              type="button"
              value="Nửa ngày"
              onClick={() => this.setTypeReport(true)}
            />
            <input
              className={this.state.act2}
              type="button"
              value="Dài ngày"
              onClick={() => this.setTypeReport(false)}
            />
          </div>
          <div className={this.state.severalDays}>
            <label>
              <p>Từ</p>
              <input
                type="date"
                value={this.state.start}
                onChange={this.handleChangeStart}
              />
            </label>
            <label>
              <p>Đến</p>
              <input
                type="date"
                value={this.state.end}
                onChange={this.handleChangeEnd}
              />
            </label>
          </div>
          <div className={this.state.halfDay}>
            <label>
              <p>Ngày</p>
              <input
                type="date"
                value={this.state.date}
                onChange={this.handleChangeDate}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <textarea
              rows="10"
              placeholder="Nhập lí do của bạn vào đây..."
              value={this.state.reportContent}
              onChange={this.handleTextarea}
              required
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div
              className="btn btn-submit-report"
              onClick={() => {
                if (this.state.act1 === "") {
                  this.props.actSendReport({
                    typeReport: "true",
                    date: {
                      dateStart: this.state.start,
                      dateEnd: this.state.end,
                    },
                    content: this.state.reportContent,
                  });
                } else {
                  this.props.actSendReport({
                    typeReport: "false",
                    date: {
                      dateStart: this.state.date,
                    },
                    content: this.state.reportContent,
                  });
                }
              }}
            >
              Gửi
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { actSendReport })(ReportForm);
