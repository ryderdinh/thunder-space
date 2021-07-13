import React from "react";

export default class TdItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "green",
      date: 0,
      hour: 0,
      nwork: 0,
    };
  }

  async componentDidMount() {
    switch (this.props.item[0]) {
      case 0: {
        this.setState({
          status: "green",
        });
        break;
      }
      case 1: {
        this.setState({
          status: "gray",
        });
        break;
      }
      case 2: {
        this.setState({
          status: "red",
        });
        break;
      }
      default:
        break;
    }
    let fullY = this.props.item[1];
    let year = Number(fullY.slice(6, 10));
    let month = Number(fullY.slice(3, 5));
    let day = Number(fullY.slice(0, 2));
    let dateN = new Date(year, month - 1, day);
    if (dateN.getDay() === 0) this.setState({ date: "CN" });
    else this.setState({ date: dateN.getDay() + 1 });

    let changeTimeToFloat = (value1, value2) => {
      value1 =
        Number(value1.slice(0, 2)) +
        Number(value1.slice(3, 5)) / 60 +
        Number(value1.slice(6, 8)) / 3600;
      value2 =
        Number(value2.slice(0, 2)) +
        Number(value2.slice(3, 5)) / 60 +
        Number(value2.slice(6, 8)) / 3600;
      let value = (value2 - value1).toFixed(2);
      return value;
    };

    let timeStart = this.props.item[2];
    let timeEnd = this.props.item[3];
    await this.setState({
      hour: changeTimeToFloat(timeStart, timeEnd),
    });
    if (this.state.hour >= 8) {
      this.setState({
        nwork: 1,
      });
    } else if (this.state.hour < 8 && this.state.hour >= 4) {
      this.setState({
        nwork: 0.5,
      });
    } else {
      this.setState({
        nwork: 0,
      });
    }
  }
  render() {
    const item = this.props.item;
    return (
      <div className="td">
        {/* <div className="td_item tow_status">
          <div className="type-status green"></div>
        </div> */}
        <div className="td_item tow_status">
          <div className={`type-status ${this.state.status}`}></div>
        </div>
        <div className="td_item tow_day">{item[1]}</div>
        <div className="td_item tow_date">{this.state.date}</div>
        <div className="td_item tow_in">{item[2]}</div>
        <div className="td_item tow_out">{item[3]}</div>
        <div className="td_item tow_hour">{this.state.hour}</div>
        <div className="td_item tow_nwork">{this.state.nwork}</div>
        {/* <div className="td_item tow_hour">10</div>
        <div className="td_item tow_nwork">1</div> */}
      </div>
    );
  }
}

