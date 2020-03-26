import React from 'react'

const withModal = (WrappedComponent) => {

  return (props) => {
    return (
      <div className="hoc">
        <WrappedComponent {...props}/>
      </div>
    )
  }
}

export default withModal;