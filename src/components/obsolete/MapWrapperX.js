import React from 'react';
// import Map from './MapOne';
import RightBar from './RightBar';
// import GoogleMap, { Marker } from 'react-maps-google';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
// import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"


let mark = [{lat: 40.7174343, lng: -73.9930319},{lat: 40.7174343, lng: -73.9940319}];
let markers = [];


const MyMapComponent = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    
  ></GoogleMap>)

// const handleApiLoaded = (map, maps) => {
//   // use map and maps objects
//   console.log(map.getBounds())
// };

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}


class MapWrapper extends React.Component {
  

  setMarkers = () => {
    mark.forEach(mark => {
      return markers.push(<Marker position={mark}/>)
    })
  }

  componentDidMount(){
    this.setMarkers();
    console.log(withGoogleMap.getBounds())
  }
  render(){
    return (
      <React.Fragment>
        <div className="mapInnerWrapper">

        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDlQE9vOQFWaa6ZeidzikJq9Ry0PpO6gzk' }}
          defaultCenter={this.props.pos}
          defaultZoom={17}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          options={createMapOptions}
          // onClick={function(map, maps ){handleApiLoaded(map, maps)}}
          // onClick={()=>{this.getMapBounds}}
        >

        </GoogleMapReact>
        {/* <MyMapComponent
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        ></MyMapComponent> */}

          {/* <GoogleMap 
          options = {{zoom: 16, center: this.props.pos, streetViewControl: false, mapTypeControlOptions: {mapTypeIds: []}, fullscreenControl: false}}
          position = {this.props.pos}
          onClick={function(){alert('click')}}
          apiKey="AIzaSyDlQE9vOQFWaa6ZeidzikJq9Ry0PpO6gzk">
          {markers}
          </GoogleMap> */}
        <div className="RightBar"><RightBar></RightBar></div>zoomControlOptions: position:LEFT_BOTTOM}
      </div>
      </React.Fragment>
    )
  }
}
export default MapWrapper;