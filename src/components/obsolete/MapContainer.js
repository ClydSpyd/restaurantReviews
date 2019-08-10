import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import customStyles from './customStyles.json';

const style = {
  width: '100%',
  height: '100%'
}

var currentCenter = {}
var restaurants = []

const google = window.google;

export class MapContainer extends React.Component {
  constructor(props){
    super(props);
    this.getCenter=this.getCenter.bind(this);
    this.initiateMapLocation=this.initiateMapLocation.bind(this);
    this.getPlaces=this.getPlaces.bind(this)
    this.searchAgain=this.searchAgain.bind(this)
  }
  state = {
    rest:[],
    currentCenter: {}
  }

  setStyles = (map) => {
    map.setOptions({
      styles: customStyles
    })
    console.log('set style')
  }

  getPlaces = (map, mapProps) => {
    const places = new window.google.maps.places.PlacesService(map);
    var request = { location: {lat: this.state.currentCenter.lat,lng: this.state.currentCenter.lng-0.0002}, radius: 40, type: ['restaurant']};
    places.nearbySearch(request, callback);

    function callback(results, status) {
    for (var i = 0; i < results.length; i++) 
    {console.log('res: ' + results[i].name); 
      restaurants.push(results[i])}
  }
  restaurants=[]
  this.setState({
    currentCenter
  })
  setTimeout(this.props.handlePlaces.bind(null, restaurants), 1200);
  }

  getCenter = (mapProps, map) => {
    let lng = map.center.lng()
    let lat = map.center.lat()
    let coords = {lat,lng}
    this.props.handleRecentre(coords)
    currentCenter=coords;
    this.setState({
      currentCenter
    })
  }
  
  searchAgain = (mapProps, map) => {
    this.getCenter(mapProps,map)
    this.getPlaces(map)
  }
  
  initiateMapLocation = (mapProps, map) => {
    this.getCenter(mapProps,map)
    console.log('initiate')
    this.setStyles(map)
    // this.getPlaces(map)
    this.setState({
      currentCenter
    })
  }

  
  render() {
    
    if(!this.props.pos){
      return <div />
    }
  return (

    <div className="r">
      <Map
        places={this.props.places}
        initialCenter={{lat: 33, lng:44}} 
        // center={this.props.pos} 
        google={this.props.google} 
        zoom={19} 
        style={style} 
        onReady={this.initiateMapLocation}
        onDragend={this.searchAgain}
        handleRecenter={this.props.handleRecenter}
        streetViewControl = {false}
        zoomControl= {false}
        fullscreenControl= {false}
        mapTypeControl = {false}
      >
        {this.props.places.map(rest=>{
          var lat = rest.geometry.location.lat()
          var lng = rest.geometry.location.lng()
          console.log(rest.name)
          return <Marker 
          animation = {google.maps.Animation.DROP}
          position= {{lat:lat,lng:lng}}
          icon={{
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
            // fillColor: 'red',
            // fillOpacity: 0.5,
            scale: 6,
            strokeColor: 'purple',
            strokeWeight: 2}}
          // icon={('http://maps.google.com/mapfiles/kml/paddle/purple-diamond.png' )}
          // icon={('http://maps.google.com/mapfiles/ms/icons/green-dot.png')}
          /> 
        })}



      <Marker 
        // animation = {google.maps.Animation.DROP}
        position= {this.props.pos}
        icon={{
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: 'blue',
          fillOpacity: 0.2,
          scale: 7,
          strokeColor: 'blue',
          strokeWeight: 1}}
        />
      </Map>
    </div>
  );
}
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDlQE9vOQFWaa6ZeidzikJq9Ry0PpO6gzk')
})(MapContainer)