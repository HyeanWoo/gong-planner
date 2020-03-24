import React from 'react'
import { Link } from 'react-router-dom';

const Setting = () => {
  return(
    <div className="center setting">
      <div className="row">
      <div className="col s4 offset-s4">
        this is setting page
      </div>
      <div className="col s1 offset-11">
        <Link to="/">X</Link>
      </div>  
      </div>
    </div>
  )
}

export default Setting;