import React, { Component } from "react";
import { connect } from "react-redux";
import EventItem from "./EventItem";
import { actFetchEvents } from "../../../actions";

export class Event extends Component {
  state = {
    listEvent: [],
  };
  async componentDidMount() {
    await this.props.actFetchEvents();
    console.log(this.props);
    let eventsProps = this.props.events;
    let listEvent = [];
    let i = 0;
    while (i < eventsProps.length - 1) {
      let arrR = [eventsProps[i]];
      let j = i + 1;
      while (j < eventsProps.length) {
        if (eventsProps[i] === eventsProps[j]) {
          arrR = [...arrR, eventsProps[j]];
        }
        ++j;
      }
      listEvent = [...listEvent, arrR];
      ++i;
    }
    this.setState({ listEvent });
  }

  render() {
    console.log(this.state);
    return (
      <div className="view_item event animate__animated animate__slideInUp">
        {this.state.listEvent.map((value, index) => (
          <EventItem key={index} dataEvent={value} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state._events._events,
});

export default connect(mapStateToProps, { actFetchEvents })(Event);
