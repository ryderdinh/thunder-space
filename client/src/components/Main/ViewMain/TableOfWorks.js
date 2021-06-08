import React from "react";
import { connect } from "react-redux";
import { actFetchDataTableOfWork } from "actions";
import DayItem from "./DayItem";

export class TableOfWork extends React.Component {
  state = {
    number: 0,
    month: 0,
    year: 0,
    positionDayStart: 0,
    arrDay: [],
  };

  componentDidMount() {
    this.props.actFetchDataTableOfWork();
    let now = new Date();
    let nowMonth = Number(now.getMonth() + 1);
    let nowYear = Number(now.getFullYear());
    let positionDayStart = new Date(nowYear, nowMonth - 1, 1).getDay();
    this.setState({
      month: nowMonth,
      year: now.getFullYear(),
      positionDayStart,
    });

    switch (nowMonth) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        nowMonth = 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        nowMonth = 30;
        break;
      case 2:
        if (
          (nowMonth % 4 === 0 &&
            nowMonth % 100 !== 0 &&
            nowMonth % 400 !== 0) ||
          (nowMonth % 100 === 0 && nowMonth % 400 === 0)
        ) {
          nowMonth = 29;
        } else {
          nowMonth = 28;
        }
        break;
      default:
        this.setState({ number: 0 });
        break;
    }
    this.setState({ number: nowMonth });
    let createArrDay = [];
    for (let i = 2 - positionDayStart; i <= nowMonth; i++) {
      createArrDay.push(i);
    }
    this.setState({ arrDay: [...createArrDay] });
  }

  render() {
    let { month, year } = this.state;
    return (
      <div className="table-of-work animate__animated animate__fadeIn">
        <h2>{`Tháng ${month} ${year}`}</h2>
        <form action="#">
          <label className="weekday">Mo</label>
          <label className="weekday">Tu</label>
          <label className="weekday">We</label>
          <label className="weekday">Th</label>
          <label className="weekday">Fr</label>
          <label className="weekday">Sa</label>
          <label className="weekday">Su</label>
          {this.state.arrDay.map((number, index) => (
            <DayItem key={index} numberDay={number} dataDay={"acb"} />
          ))}
          <div className="clearfix"></div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state._tableOfWorks._items,
  };
};

export default connect(mapStateToProps, { actFetchDataTableOfWork })(
  TableOfWork
);
