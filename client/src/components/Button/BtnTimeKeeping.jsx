import { actSendLocationToServer } from 'actions'
import React from 'react'
import toast from 'react-hot-toast'
import { connect } from 'react-redux'
export class BtnTimeKeeping extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: []
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          location: [position.coords.latitude, position.coords.longitude]
        })
        this.props.actSendLocationToServer(this.state.location)
      })
    } else {
      toast.error('Geolocation is not supported by this browser.')
    }
  }
  render() {
    const { className, content } = this.props
    return (
      <div
        className={className}
        onClick={() => {
          this.getLocation()
        }}
      >
        {content}
      </div>
    )
  }
}

export default connect(null, { actSendLocationToServer })(BtnTimeKeeping)
