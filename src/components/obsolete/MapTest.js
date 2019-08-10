import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import customStyles from './customStyles.json'

const style = {
  width: '100%',
  height: '100%'
}
var restaurants;
var currentCenter;
const google = window.google;

export class MapTest extends React.Component {
  constructor(props){
    super(props);
    this.getPlaces=this.getPlaces.bind(this)
    // this.initiate=this.initiate.bind(this)
  }
  state = {
    rest:[],
    currentCenter: {}
  }
  getPlaces = (map, mapProps) => {
    const places = new window.google.maps.places.PlacesService(map);
    var request = { location: {lat: this.state.currentCenter.lat,lng: this.state.currentCenter.lng-0.0002}, radius: 15, type: ['restaurant']};
    places.nearbySearch(request, callback);

    function callback(results, status) {
    for (var i = 0; i < results.length; i++) 
    {console.log('res: ' + results[i].name); 
      restaurants.push(results[i])}
  }
  this.setState({
    currentCenter,
    rest:restaurants
  })
  restaurants=[]
  // setTimeout(this.props.handlePlaces.bind(null, restaurants), 1200);
  }

  getCenter = (mapProps, map) => {
    let lng = map.center.lng()
    let lat = map.center.lat()
    let coords = {lat,lng}
    // this.props.handleRecentre(coords)
    currentCenter=coords;
    this.setState({
      currentCenter
    })
    console.log(currentCenter)
  }

  setStyles = (map) => {
    map.setOptions({
      styles: customStyles
    })
    console.log('set style')
  }

  searchAgain = (mapProps, map) => {
    this.getCenter(mapProps,map)
    this.getPlaces(map)
  }

  initiateMap = (mapProps, map) => {
    this.getCenter(mapProps,map)
    this.setStyles(map)
    // this.getPlaces(map)
    this.setState({currentCenter})
  }

  render() {
    
  return (

      <Map
        places={this.props.places}
        initialCenter={{lat: this.props.pos.lat, lng:this.props.pos.lng+0.00035}} 
        google={this.props.google} 
        zoom={19} 
        style={style} 
        streetViewControl = {false}
        zoomControl= {false}
        fullscreenControl= {false}
        mapTypeControl = {false}
        onClick={this.getCenter}
        onDragend={this.searchAgain}
        onReady={this.initiateMap}
      >

<Marker 
          animation = {google.maps.Animation.DROP}
          position= {this.props.pos}
          icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
          // icon={'http://maps.google.com/mapfiles/kml/pal2/icon45.png'}
          // icon={('http://maps.google.com/mapfiles/kml/paddle/purple-diamond.png' )}
          // icon={('http://maps.google.com/mapfiles/ms/icons/green-dot.png')}
          /> 
      </Map>
  );
}
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDlQE9vOQFWaa6ZeidzikJq9Ry0PpO6gzk')
})(MapTest)