import React from "react";
import DayItem from "./DayItem";
import { motion } from "framer-motion";
export class Timesheets extends React.Component {
  state = {
    number: 0,
    month: 0,
    year: 0,
    positionDayStart: 0,
    arrDay: [],
  };

  componentDidMount() {
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
    let { variants } = this.props;
    return (
      <motion.div
        className="timesheets doti"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
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
            <DayItem
              key={index}
              numberDay={number}
              dateRelative={{ day: number, month, year }}
            />
          ))}
          <div className="clearfix"></div>
        </form>
      </motion.div>
    );
  }
}

export default Timesheets;
