import React from 'react';
import loadLogo from '../assets/logo-load.png'

class LandingPage extends React.Component{
  render() {
    return (
      <div className="landingPage">
             <img className="landingLogo" alt='' src={loadLogo} />
             <form action="">
               <input type="text" name="searchTextInput" id="searchTextInput" placeholder='enter location'/>
               <label className='searchLabel' htmlFor="searchTextInput">search</label>
             </form>
       </div>
    )
  }
}
export default LandingPage