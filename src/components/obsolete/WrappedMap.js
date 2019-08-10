import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

function Map() {
  return (
    <GoogleMap
    zoom= {10}
    defaultCenter = {{lat: 40.4045061, lng: -3.6965152999999997}}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;