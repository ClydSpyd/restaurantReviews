import React from 'react';
import RightBar from './RightBar';
import MapContainer from './MapContainer';
import Test from './test'


class MapWrapper extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <React.Fragment>

        <div className="mapInnerWrapper">
        <div className="RightBar"><RightBar></RightBar></div>
        <MapContainer className='Map'
        handlePlaces = {this.props.handlePlaces} 
        handleRecentre={this.props.handleRecentre} 
        pos={this.props.pos} 
        places={this.props.places} 
        />

       
      </div>
      </React.Fragment>
    )
  }
}
export default MapWrapper;