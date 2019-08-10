import React from 'react'
// import pic from '../assets/knifeAndFork.png'
import ListItem from './ListItem'

var listItems = []
class RightBar extends React.Component{
  // state = {
  //   listItems: []
  // }
  render() {
  //   for (var i=0; i<this.props.places.length; i++){
  //     listItems.push(< ListItem place={this.props.places[i]} id={this.props.places[i].id} index={i} />)
  //     this.setState({listItems})
  //   }
    return (

      <div className='rightWrapper'>
        <p className='rightBarTitle'>Eats in the area:</p>
        {this.props.places.map(place => {
          // console.log(place)
          return(
            < ListItem 
              place={place} 
              storedDetails={this.props.storedDetails}
              handleStoredDetails={this.props.handleStoredDetails}
              key={place.place_id} 
              markers={this.props.markers} 
              handleDetailRequest={this.props.handleDetailRequest} 
              map={this.props.map}
              currentPlace={this.props.currentPlace}
            />
          )})
        }
        {listItems}
      </div>
    )
  }
}

export default RightBar;