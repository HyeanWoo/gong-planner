import React from 'react'
import ReactModal from 'react-modal';

const withTodayModal = (WrappedComponent) => {
  return (props) => {
    const customStyles = {
      content : {
        top                   : '40%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return (
      <ReactModal 
          isOpen={props.showModal}
          contentLabel="reuse-today-modal"
          ariaHideApp={false}
          onRequestClose={props.closeModal}
          style={customStyles}
      >
        <WrappedComponent {...props}/>
      </ReactModal>
    )
  }
}

export default withTodayModal;