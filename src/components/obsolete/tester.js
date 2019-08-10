import React from 'react';
import MapTest from './MapTest'
import spin from '../assets/spin.gif'

class Test extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pos: {},
      loaded: false
    }
  }
  
  test = (callback) => {
    this.setInitial(callback)
    
    }

    setInitial = (callback) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.initMap(callback));
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
      }

  initMap = (position, callback) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    this.setState ({
      pos: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    })
    callback()
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

    // if(this.state.loaded){
    //   return(
    //     <MapTest pos={this.state.pos}/>
    //   )
    // }else{
      return(
       <div id='load'>
          <img src={spin} alt="loading..." />
        </div>
      )
    // }
  }
}

export default Test  