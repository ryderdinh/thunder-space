import React from "react";
import { connect } from "react-redux";
import { actSendLocationToServer } from "actions";
import toast from "react-hot-toast";
export class BtnTimeKeeping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
    };
  }
  async getLocation() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          location: [position.coords.latitude, position.coords.longitude],
        });   
        this.props.actSendLocationToServer(this.state.location);
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }
  render() {
    const { className, content } = this.props;
    return (
      <div className={className} onClick={() => this.getLocation()}>
        {content}
      </div>
    );
  }
}

export default connect(null, { actSendLocationToServer })(BtnTimeKeeping);
