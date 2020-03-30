import React from 'react'

const Setting = props => {
  const goBack = () => {
    props.history.goBack();
  }

  // const colName = props.match.params.colName;

  return(
    <div className="center setting">
      <div className="row">
      <div className="col s4 offset-s4">
        this is setting page
      </div>
      <div className="col s1 offset-11">
        <button onClick={goBack}>X</button>
      </div>  
      </div>
    </div>
  )
}

export default Setting;