import React from 'react';
import MapTest from './MapTest'
import ripple from '../assets/ripple2.gif'
import RightBar from './RightBar'

class Test extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pos: {},
      loaded: false
    }
  }

  secondStep = () => {
    console.log('state location: lat:' + this.state.pos.lat + 'lng: ' + this.state.pos.lng);
    this.setState({
      loaded: true
    })
  }

  doTheThing = (callback) => {
    navigator.geolocation.getCurrentPosition(pos => {
    console.log(pos.coords)
    this.setState({
      pos: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
    })
    callback()
  })}


  async componentDidMount() {
    await this.doTheThing(this.secondStep)
  }
  
  content() {
    return (
      <div >
        <h1>{this.state.pos}</h1>
      </div>
    )
  }
  
  render() {

    if(this.state.loaded){
      return(
        <React.Fragment>

        <div className="mapInnerWrapper">
        <div className="RightBar"><RightBar></RightBar></div>
        <MapTest className='Map'
        handlePlaces = {this.props.handlePlaces} 
        handleRecentre={this.props.handleRecentre} 
        pos={this.state.pos} 
        places={this.props.places} 
        />

       
      </div>
      </React.Fragment>
      )
    }else{
      return(
       <div id='load'>
          <img src={ripple} alt="loading..." />
          <p>awaiting geolocation data</p>
          <div className='pad'></div>
        </div>
      )
    }
  }
}

export default Test  