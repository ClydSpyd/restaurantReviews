import React from 'react';
import ReactDOM from 'react-dom';

const google = window.google;
var userLocationMarker;
var gMap;
var bounds;

class Map extends React.Component{
    
    constructor(props){
        super(props)
        // this.initMap=this.initMap.bind(this)
        this.bounceyBounce=this.bounceyBounce.bind(this)
        this.bouncey=this.bouncey.bind(this)
        console.log(props.pos)
        // this.getIDs=this.getIDs.bind(this)
    }
    
    initMap = () => {
    // var posOffCenter = {lat: this.props.pos.lat, lng: this.props.pos.lng+0.0007};
    var styledMapType = new google.maps.StyledMapType(
      [
      {
          "featureType": "administrative.locality",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#ff0200"
              },
              {
                  "saturation": 7
              },
              {
                  "lightness": 19
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "saturation": "-3"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#748ca3"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#ff0200"
              },
              {
                  "saturation": -100
              },
              {
                  "lightness": 100
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#ff0200"
              },
              {
                  "saturation": "23"
              },
              {
                  "lightness": "20"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffdbda"
              },
              {
                  "saturation": "0"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ff0200"
              },
              {
                  "saturation": "100"
              },
              {
                  "lightness": 31
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#f39247"
              },
              {
                  "saturation": "0"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "hue": "#008eff"
              },
              {
                  "saturation": -93
              },
              {
                  "lightness": 31
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffe5e5"
              },
              {
                  "saturation": "0"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [
              {
                  "hue": "#bbc0c4"
              },
              {
                  "saturation": -93
              },
              {
                  "lightness": -2
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "hue": "#ff0200"
              },
              {
                  "saturation": -90
              },
              {
                  "lightness": -8
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#e9ebed"
              },
              {
                  "saturation": 10
              },
              {
                  "lightness": 69
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#e9ebed"
              },
              {
                  "saturation": -78
              },
              {
                  "lightness": 67
              },
              {
                  "visibility": "simplified"
              }
          ]
      }
  ]);
  
    gMap = new google.maps.Map(document.getElementById('mapper'), {zoom: 16, center: this.props.pos, streetViewControl: false, mapTypeControlOptions: {mapTypeIds: []},zoomControlOptions: {position: google.maps.ControlPosition.LEFT_BOTTOM}, fullscreenControl: false});

    // const places = new google.maps.places.PlacesService(map);
  
    // bounds = gMap.getBounds()

    userLocationMarker = new google.maps.Marker({
    position: this.props.pos, 
    map: gMap,
    icon: {path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, fillColor: 'blue', fillOpacity: 0.5, scale: 6, strokeColor: 'blue',  strokeWeight: 1, zIndex: 1},
    animation: google.maps.Animation.DROP,
    });
    gMap.mapTypes.set('styled_map', styledMapType);
    gMap.setMapTypeId('styled_map');

    setTimeout(this.bounceyBounce, 2000)

    gMap.addListener('dragend',  this.props.handleDrag)

    gMap.addListener('click',  function(){
        console.log('map clicked, bounds: ' + bounds)
    })
  }
 


//   getIDs = () => {

//     const places = new google.maps.places.PlacesService(gMap);
//     var restaurants = [];
//     var restaurantIDs = [];
//     // mapBounds = map.getBounds();
//     // setTimeout(clearMarkers, 500)
//     var request = { bounds: mapBounds, type: ['restaurant']}; //// COMMENTED OUT TO LIMIT CALLS DURING DEV
//     var request = { location: this.props.pos, radius: 150, type: ['restaurant']};
//     places.nearbySearch(request, callback);
//     function callback(results, status) {
//     console.log(results)
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         restaurants.push(results[i]);
//         restaurantIDs.push(results[i].place_id)}}
//       }
//       console.log(restaurants)
//     }


  
  componentDidMount(){
    
    ReactDOM.findDOMNode(this).addEventListener('setPos',alert('check'))
    // setTimeout(this.initMap,2000);
    // this.getIDs();
  }


bouncey = () => {
    userLocationMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
    userLocationMarker.setAnimation(null)
    }, 1400);
}

bounceyBounce = () => {
    this.bouncey()
    setInterval(this.bouncey, 5000)
    // console.log('up')
}

  render(){
    return (
      <div  id="mapper" />
    )
  }
}
export default Map