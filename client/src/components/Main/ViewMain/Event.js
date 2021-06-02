import React, { Component } from "react";
import { connect } from "react-redux";
import EventItem from "./EventItem";
import { actFetchEvents } from "../../../actions";

export class Event extends Component {
  componentDidMount() {
    this.props.actFetchEvents();
  }

  render() {
    const { events } = this.props;
    return (
      <div className="view_item event animate__animated animate__slideInUp">
        {events.map((value, index) => (
          <EventItem
            key={index}
            name={value.name}
            time={value.date}
            place={value.position}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state._events._events,
});

export default connect(mapStateToProps, { actFetchEvents })(Event);
