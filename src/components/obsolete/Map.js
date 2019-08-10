import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
  
const google = window.google;



class Map extends React.Component{
  constructor(props){
    super(props)
    // this.initMap=this.initMap.bind(this)
    // this.Mapper=this.Mapper.bind(this)
  }




// componentDidMount(){
//     WrappedMap.addListener('click', function(){alert('click')})
// }







//   initMap = () => {
//     var posOffCenter = {lat: this.props.pos.lat, lng: this.props.pos.lng+0.0007};
//     var styledMapType = new google.maps.StyledMapType(
//       [
//       {
//           "featureType": "administrative.locality",
//           "elementType": "all",
//           "stylers": [
//               {
//                   "hue": "#ff0200"
//               },
//               {
//                   "saturation": 7
//               },
//               {
//                   "lightness": 19
//               },
//               {
//                   "visibility": "on"
//               }
//           ]
//       },
//       {
//           "featureType": "administrative.locality",
//           "elementType": "labels.text",
//           "stylers": [
//               {
//                   "visibility": "on"
//               },
//               {
//                   "saturation": "-3"
//               }
//           ]
//       },
//       {
//           "featureType": "administrative.locality",
//           "elementType": "labels.text.fill",
//           "stylers": [
//               {
//                   "color": "#748ca3"
//               }
//           ]
//       },
//       {
//           "featureType": "landscape",
//           "elementType": "all",
//           "stylers": [
//               {
//                   "hue": "#ff0200"
//               },
//               {
//                   "saturation": -100
//               },
//               {
//                   "lightness": 100
//               },
//               {
//                   "visibility": "simplified"
//               }
//           ]
//       },
//       {
//           "featureType": "poi",
//           "elementType": "all",
//           "stylers": [
//               {
//                   "hue": "#ff0200"
//               },
//               {
//                   "saturation": "23"
//               },
//               {
//                   "lightness": "20"
//               },
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "poi.school",
//           "elementType": "geometry.fill",
//           "stylers": [
//               {
//                   "color": "#ffdbda"
//               },
//               {
//                   "saturation": "0"
//               },
//               {
//                   "visibility": "on"
//               }
//           ]
//       },
//       {
//           "featureType": "road",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "hue": "#ff0200"
//               },
//               {
//                   "saturation": "100"
//               },
//               {
//                   "lightness": 31
//               },
//               {
//                   "visibility": "simplified"
//               }
//           ]
//       },
//       {
//           "featureType": "road",
//           "elementType": "geometry.stroke",
//           "stylers": [
//               {
//                   "color": "#f39247"
//               },
//               {
//                   "saturation": "0"
//               }
//           ]
//       },
//       {
//           "featureType": "road",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "hue": "#008eff"
//               },
//               {
//                   "saturation": -93
//               },
//               {
//                   "lightness": 31
//               },
//               {
//                   "visibility": "on"
//               }
//           ]
//       },
//       {
//           "featureType": "road.arterial",
//           "elementType": "geometry.stroke",
//           "stylers": [
//               {
//                   "visibility": "on"
//               },
//               {
//                   "color": "#ffe5e5"
//               },
//               {
//                   "saturation": "0"
//               }
//           ]
//       },
//       {
//           "featureType": "road.arterial",
//           "elementType": "labels",
//           "stylers": [
//               {
//                   "hue": "#bbc0c4"
//               },
//               {
//                   "saturation": -93
//               },
//               {
//                   "lightness": -2
//               },
//               {
//                   "visibility": "simplified"
//               }
//           ]
//       },
//       {
//           "featureType": "road.arterial",
//           "elementType": "labels.text",
//           "stylers": [
//               {
//                   "visibility": "off"
//               }
//           ]
//       },
//       {
//           "featureType": "road.local",
//           "elementType": "geometry",
//           "stylers": [
//               {
//                   "hue": "#ff0200"
//               },
//               {
//                   "saturation": -90
//               },
//               {
//                   "lightness": -8
//               },
//               {
//                   "visibility": "simplified"
//               }
//           ]
//       },
//       {
//           "featureType": "transit",
//           "elementType": "all",
//           "stylers": [
//               {
//                   "hue": "#e9ebed"
//               },
//               {
//                   "saturation": 10
//               },
//               {
//                   "lightness": 69
//               },
//               {
//                   "visibility": "on"
//               }
//           ]
//       },
//       {
//           "featureType": "water",
//           "elementType": "all",
//           "stylers": [
//               {
//                   "hue": "#e9ebed"
//               },
//               {
//                   "saturation": -78
//               },
//               {
//                   "lightness": 67
//               },
//               {
//                   "visibility": "simplified"
//               }
//           ]
//       }
//   ]);
  
//     map = new google.maps.Map(document.getElementById('mapper'), {zoom: 18, center: posOffCenter, streetViewControl: false, mapTypeControlOptions: {mapTypeIds: []},zoomControlOptions: {position: google.maps.ControlPosition.LEFT_BOTTOM}, fullscreenControl: false});

//     const places = new google.maps.places.PlacesService(map);
//     var mapBounds = map.getBounds();
//     console.log(mapBounds)
  

//     // this.props.handleDrag(mapBounds)

//      userLocationMarker = new google.maps.Marker({
//       position: this.props.pos, 
//       map: map,
//       icon: {
//           path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
//           fillColor: 'blue',
//           fillOpacity: 0.5,
//           scale: 6,
//           strokeColor: 'blue',
//           strokeWeight: 1,
//           zIndex: 1
//         },
//         animation: google.maps.Animation.DROP,
//         });
//         map.mapTypes.set('styled_map', styledMapType);
//         map.setMapTypeId('styled_map');
//         // map.addListener('dragend', function(){
//         //   this.props.handleDrag(mapBounds)
//         // })
//   }


  
  

//   componentDidMount(){
//     setTimeout(this.initMap,1200);
//   }

  render(){

    function Mapper() {
        return (
          <GoogleMap
          zoom= {10}
          defaultCenter = {`${this.props.pos}`}
          />
        );
      }
      
      const WrappedMap = withScriptjs(withGoogleMap(Mapper));
    //   Mapper.addListener('click',function(){
    //       alert('click')
    //   })

    // var map;
    return (
        <div id="mapper">
        <WrappedMap 
        googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyDlQE9vOQFWaa6ZeidzikJq9Ry0PpO6gzk&libraries=places"} 
        loadingElement= {<div style={{height:'100%'}}/>}
        containerElement= {<div style={{height:'100%'}}/>}
        mapElement= {<div style={{height:'100%'}}/>}
        />
      </div>
    )
  }
}
export default Map