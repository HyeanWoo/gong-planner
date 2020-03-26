import React from 'react'
import ReactModal from 'react-modal';

const withModal = (buttonName, options) => WrappedComponent => {
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

    const [showModal, setshowModal] = React.useState(false);

    const handleOpenModal = () => {
      setshowModal(true);
    }
    
    const handleCloseModal = () => {
      setshowModal(false);
    }

    const delFlag = options[0];
    const addFlag = options[1];
    const subFlag = options[2];
    return (
      <>
      <button onClick={handleOpenModal}>{buttonName}</button>
      <ReactModal 
          isOpen={showModal}
          contentLabel="reuse-modal"
          ariaHideApp={false}
          onRequestClose={handleCloseModal}
          style={customStyles}
      >
        <WrappedComponent {...props}/>
        {delFlag ? <button style={{backgroundColor:"#FF0000"}}>제거</button> : <></>}
        <button onClick={handleCloseModal}>닫기</button>
        {addFlag ? <button>추가</button> : <></>}
        {subFlag ? <button>완료</button> : <></>}
      </ReactModal>
      </>
    )
  }
}

export default withModal;