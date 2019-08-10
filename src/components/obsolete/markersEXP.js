import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import customStyles from './customStyles.json'
import samples from '../samples.json'

const style = {
  width: '100%',
  height: '100%'
}
var restaurants = []
var currentCenter;
const google = window.google;
var contentString
var infowindow
var markers = []

export class MapComp extends React.Component {
  constructor(props){
    super(props);
    // this.updateListeners=this.updateListeners.bind(this)
    this.getPlaces=this.getPlaces.bind(this)
    this.initiateMap=this.initiateMap.bind(this)
  }
  state = {
    currentCenter: {}
  }



  dropPinsNotBombs = (map) => {
    for (var i = 0; i < this.props.places.length; i++) {
    this.dropPin({lat: this.props.places[i].geometry.location.lat, lng: this.props.places[i].geometry.location.lng}, i * 50, this.props.places[i].place_id, i,this.props.places[i].name, map)}
    console.log(markers);
      setTimeout(function(map){
        markers.forEach(marker =>{
          var markerID;
          var contentString = '';
          var infowindow;
          console.log('marker: ' + marker.name)
      
            marker.addListener('mouseover', function() {  
            console.log('hai')
            markerID = marker.id
            contentString = marker.name
            infowindow = new google.maps.InfoWindow({content: contentString});
            // infowindow.className='infowindow';
            infowindow.open(map, marker);
          });
        
          marker.addListener('mouseout', function() {
          infowindow.close(map, marker);
          });
        
          // marker.addListener('click', function(){
          //   console.log(this.id);
          //   getDeetz(this.id, this.index)
          // })
        
        })
      },2000)
  }
  
   dropPin = (position, timeout, id, index,name, map) => {
    window.setTimeout(function() {
      markers.push(new google.maps.Marker({
          name:name,
          id:id,
          index: index,
          position: position,
          map: map,
      //     icon: {
      //     // path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      //     fillColor: 'red',
      //     fillOpacity: 0.5,
      //     scale: 6,
      //     strokeColor: 'red',
      //     strokeWeight: 1,
      //     zIndex: 1
      // },
        animation: google.maps.Animation.DROP
      }));
    }, timeout);
  }
  
  showPins = (samples,map) => {
    this.loadSamples(samples)
    setTimeout(this.dropPinsNotBombs.bind(null, map), 900);
  }

  
  

  // ===GET RESTAURANTS FROM GOOGLE MAPS AND SET THEM TO APP STATE===//

  getPlaces = (map, mapProps) => {
    restaurants=[]
    this.props.handlePlaces(restaurants)
    const places = new window.google.maps.places.PlacesService(map);
    var request = { location: {lat: this.state.currentCenter.lat,lng: this.state.currentCenter.lng-0.0002}, radius:150, type: ['restaurant']};
    places.nearbySearch(request, callback);

    function callback(results, status) {
    for (var i = 0; i < results.length; i++) 
    {console.log('res: ' + results[i].name); 
      restaurants.push(results[i])}
  }
  console.log(restaurants)
  setTimeout(this.props.handlePlaces.bind(null, restaurants), 500);
  setTimeout(function(){restaurants=[]}, 700);
  }

  loadSamples = (samples) => {
    for (var i = 0; i < samples.length; i++) 
    {console.log('res: ' + samples[i].name); 
      restaurants.push(samples[i])}
    setTimeout(this.props.handlePlaces.bind(null, restaurants), 500);
  }

  //======GET CENTER OF MAP AFTER SCROLL========//

  getCenter = (mapProps, map) => {
    let lng = map.center.lng()
    let lat = map.center.lat()
    let coords = {lat,lng}
    this.props.handleRecentre(coords)
    currentCenter=coords;
    this.setState({
      currentCenter
    })
    console.log(currentCenter)
  }


  //====SET CUSTOM MAP STYLES====//

  setStyles = (map) => {
    map.setOptions({
      styles: customStyles
    })
    console.log('set style')
  }

  //=====GET MORE RESTAURANTS/SET CENTER AFTER SCROLL====//
  searchAgain = (mapProps, map) => {
    this.getCenter(mapProps,map)
    // this.getPlaces(map)/////<<------COMMENTED OUT TO STOP UNNECESSARY QUERIES DURING DEV
  }


  //==== INITIATE MAP CENTER, STYLES AND NEARBY RESTAURANTS ====//
  initiateMap = (mapProps, map) => {
    this.getCenter(mapProps,map)
    this.setStyles(map)
    this.setState({currentCenter})
    // setTimeout(this.getPlaces.bind(null, map), 300);/////<<------COMMENTED OUT TO STOP QUERIES DURING DEV
    // this.loadSamples(samples)
    this.showPins(samples, map)
    // this.updateListeners(markers, map) 
  }

  //===== SHOW AND HIDE INFO WINDOWS ======//
    showInfoWindow = (marker, map) => {  
      contentString = marker.name
      infowindow = new window.google.maps.InfoWindow({content: contentString});
      infowindow.open( marker,map);
    }

    hideInfoWindow = (marker, map) => {
      infowindow.close( marker,map);
    }

    // MAKE DETAIL REQUEST FOR SPECIFIC MARKER ===== //
    handleDetailRequest = (thing) => {
      console.log(thing)
    }

  render() {
    
  return (

    <Map
      places={this.props.places}
      initialCenter={{lat: this.props.pos.lat, lng:this.props.pos.lng+0.00035}} 
      google={this.props.google} 
      zoom={18} 
      style={style} 
      streetViewControl = {false}
      zoomControl= {false}
      fullscreenControl= {false}
      mapTypeControl = {false}
      onClick={this.getCenter}
      onDragend={this.searchAgain}
      onReady={this.initiateMap}
    >
      {/* user location marker */}
      <Marker 
        onClick={() => console.log('hai Dave')}
        onMouseover={this.showInfoWindow} 
        onMouseout={this.hideInfoWindow}
        name={'you are here'}
        animation = {google.maps.Animation.DROP}
        position= {this.props.pos}
        icon={'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'}
       />  
        
      {/* markers from restaurants in state */}
      {/* {this.props.places.map(place => {
        var lat
        var lng
        if(isNaN(place.geometry.location.lat)){lat=place.geometry.location.lat()}
        else {lat=place.geometry.location.lat}
        if(isNaN(place.geometry.location.lng)){lng=place.geometry.location.lng()}
        else {lng=place.geometry.location.lng}
        // place.geometry.location.lat isNan ? lat=place.geometry.location.lat() : lat=place.geometry.location.lat
        // place.geometry.location.lng isNan ? lng=place.geometry.location.lng() : lng=place.geometry.location.lng
        // // var lat=place.geometry.location.lat();
        // var lng=place.geometry.location.lng();
        console.log(lat + ':' + lng)
        return(
          <Marker 
          onClick={()=>this.props.handleDetailRequest(place.place_id)}
          onMouseover={this.showInfoWindow} 
          onMouseout={this.hideInfoWindow}
          name={place.name}
          animation = {google.maps.Animation.DROP}
          key={place.place_id}
          position= {{lat: lat, lng: lng }}
          icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
          >
          </Marker>
        )
      })} */}
    </Map>
  );}}

export default GoogleApiWrapper({apiKey: ('AIzaSyDlQE9vOQFWaa6ZeidzikJq9Ry0PpO6gzk')})(MapComp)





        // icon={'http://maps.google.com/mapfiles/kml/pal2/icon45.png'}
        // icon={('http://maps.google.com/mapfiles/kml/paddle/purple-diamond.png' )}
        // icon={('http://maps.google.com/mapfiles/ms/icons/green-dot.png')}






       // =========PREVIOUS FUNCTIONALITY========//

       import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import customStyles from './customStyles.json'
import samples from '../samples.json'

const style = {
  width: '100%',
  height: '100%'
}
var restaurants = []
var currentCenter;
const google = window.google;
var contentString
var infowindow
var markers = []

export class MapComp extends React.Component {
  constructor(props){
    super(props);
    // this.updateListeners=this.updateListeners.bind(this)
    this.getPlaces=this.getPlaces.bind(this)
    this.initiateMap=this.initiateMap.bind(this)
  }
  state = {
    currentCenter: {}
  }


  // ===GET RESTAURANTS FROM GOOGLE MAPS AND SET THEM TO APP STATE===//

  getPlaces = (map, mapProps) => {
    restaurants=[]
    this.props.handlePlaces(restaurants)
    const places = new window.google.maps.places.PlacesService(map);
    var request = { location: {lat: this.state.currentCenter.lat,lng: this.state.currentCenter.lng-0.0002}, radius:150, type: ['restaurant']};
    places.nearbySearch(request, callback);

    function callback(results, status) {
    for (var i = 0; i < results.length; i++) 
    {console.log('res: ' + results[i].name); 
      restaurants.push(results[i])}
  }
  console.log(restaurants)
  setTimeout(this.props.handlePlaces.bind(null, restaurants), 500);
  setTimeout(function(){restaurants=[]}, 700);
  }

  loadSamples = (samples) => {
    for (var i = 0; i < samples.length; i++) 
    {console.log('res: ' + samples[i].name); 
      restaurants.push(samples[i])}
    setTimeout(this.props.handlePlaces.bind(null, restaurants), 500);
  }

  //======GET CENTER OF MAP AFTER SCROLL========//

  getCenter = (mapProps, map) => {
    let lng = map.center.lng()
    let lat = map.center.lat()
    let coords = {lat,lng}
    this.props.handleRecentre(coords)
    currentCenter=coords;
    this.setState({
      currentCenter
    })
    console.log(currentCenter)
  }


  //====SET CUSTOM MAP STYLES====//

  setStyles = (map) => {
    map.setOptions({
      styles: customStyles
    })
    console.log('set style')
  }

  //=====GET MORE RESTAURANTS/SET CENTER AFTER SCROLL====//
  searchAgain = (mapProps, map) => {
    this.getCenter(mapProps,map)
    // this.getPlaces(map)/////<<------COMMENTED OUT TO STOP UNNECESSARY QUERIES DURING DEV
  }


  //==== INITIATE MAP CENTER, STYLES AND NEARBY RESTAURANTS ====//
  initiateMap = (mapProps, map) => {
    this.getCenter(mapProps,map)
    this.setStyles(map)
    this.setState({currentCenter})
    // setTimeout(this.getPlaces.bind(null, map), 300);/////<<------COMMENTED OUT TO STOP QUERIES DURING DEV
    this.loadSamples(samples)
  }

  //===== SHOW AND HIDE INFO WINDOWS ======//
    showInfoWindow = (marker, map) => {  
      contentString = marker.name
      infowindow = new window.google.maps.InfoWindow({content: contentString});
      infowindow.open( marker,map);
    }

    hideInfoWindow = (marker, map) => {
      infowindow.close( marker,map);
    }

    // MAKE DETAIL REQUEST FOR SPECIFIC MARKER ===== //
    handleDetailRequest = (thing) => {
      console.log(thing)
    }

  render() {
    
  return (

    <Map
      places={this.props.places}
      initialCenter={{lat: this.props.pos.lat, lng:this.props.pos.lng+0.00035}} 
      google={this.props.google} 
      zoom={18} 
      style={style} 
      streetViewControl = {false}
      zoomControl= {false}
      fullscreenControl= {false}
      mapTypeControl = {false}
      onClick={this.getCenter}
      onDragend={this.searchAgain}
      onReady={this.initiateMap}
    >
      {/* user location marker */}
      <Marker 
        onClick={() => console.log('hai Dave')}
        onMouseover={this.showInfoWindow} 
        onMouseout={this.hideInfoWindow}
        name={'you are here'}
        animation = {google.maps.Animation.DROP}
        position= {this.props.pos}
        icon={'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'}
       />  
        
      {/* markers from restaurants in state */}
      {this.props.places.map(place => {
        var lat
        var lng
        if(isNaN(place.geometry.location.lat)){lat=place.geometry.location.lat()}
        else {lat=place.geometry.location.lat}
        if(isNaN(place.geometry.location.lng)){lng=place.geometry.location.lng()}
        else {lng=place.geometry.location.lng}
        // place.geometry.location.lat isNan ? lat=place.geometry.location.lat() : lat=place.geometry.location.lat
        // place.geometry.location.lng isNan ? lng=place.geometry.location.lng() : lng=place.geometry.location.lng
        // // var lat=place.geometry.location.lat();
        // var lng=place.geometry.location.lng();
        console.log(lat + ':' + lng)
        return(
          <Marker 
          onClick={()=>this.props.handleDetailRequest(place.place_id)}
          onMouseover={this.showInfoWindow} 
          onMouseout={this.hideInfoWindow}
          name={place.name}
          animation = {google.maps.Animation.DROP}
          key={place.place_id}
          position= {{lat: lat, lng: lng }}
          >
          </Marker>
        )
      })}
    </Map>
  );}}

export default GoogleApiWrapper({apiKey: ('AIzaSyDlQE9vOQFWaa6ZeidzikJq9Ry0PpO6gzk')})(MapComp)





        // icon={'http://maps.google.com/mapfiles/kml/pal2/icon45.png'}
        // icon={('http://maps.google.com/mapfiles/kml/paddle/purple-diamond.png' )}
        // icon={('http://maps.google.com/mapfiles/ms/icons/green-dot.png')}




        var request = {
          placeId: "ChIJgX6MHS0mQg0RzsTmgNzmcfA",
          fields: ['name', 'formatted_address', 'formatted_phone_number', 'review', 'opening_hours', 'website']
        }
        const service = new window.google.maps.places.PlacesService(map)
        service.getDetails(request, callback);
        function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(place)
        } else {console.log(status)}
      }


      initiateMap = (mapProps, map) => {
        this.getCenter(mapProps,map)
        this.setStyles(map)
        this.setState({currentCenter})
        // setTimeout(this.getPlaces.bind(null, map), 300);/////<<------COMMENTED OUT TO STOP QUERIES DURING DEV
        this.loadSamples(samples)
        setTimeout(this.dropPinsNotBombs.bind(null, map), 900);
        var request = {
          placeId: "ChIJgX6MHS0mQg0RzsTmgNzmcfA",
          fields: ['name', 'formatted_address', 'formatted_phone_number', 'review', 'opening_hours', 'website']
        }
        const service = new window.google.maps.places.PlacesService(map)
        service.getDetails(request, callback);
        function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(place)
        } else {console.log(status)}
      }
      }




      marker.addListener('click', () =>{
          
        console.log(marker.map)
        var request = {
          placeId: "ChIJgX6MHS0mQg0RzsTmgNzmcfA",
          fields: ['name', 'formatted_address', 'formatted_phone_number', 'review', 'opening_hours', 'website']
        }
        const service = new window.google.maps.places.PlacesService(marker.map)
        service.getDetails(request, callback);
        function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(place)
        } else {console.log(status)}
      }
  
        }