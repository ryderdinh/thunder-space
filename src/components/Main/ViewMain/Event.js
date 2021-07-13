import React, { Component } from "react";
import { connect } from "react-redux";
import EventItem from "./EventItem";
// import { actFetchEvents } from "actions";

export class Event extends Component {
  render() {
    const { events } = this.props;
    return (
      <div className="view_item event animate__animated animate__slideInUp">
        {events.map((value) => (
          <EventItem key={value[0].date} dataEvent={value} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state._events._events,
});

export default connect(mapStateToProps, null)(Event);
