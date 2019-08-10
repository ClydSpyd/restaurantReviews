// import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class CustomMarker extends Marker {
  componentDidUpdate(prevProps) {
    if(
      this.props.map !== prevProps.map || 
      this.props.icon.url !== prevProps.icon.url || 
      (
        this.props.position.lat !== prevProps.position.lat || 
        this.props.position.lng !== prevProps.position.lng
      )
    ) {
      if(this.marker) {
        this.marker.setMap(null);
      }
      this.renderMarker();
    }
  }
}

export CustomMarker