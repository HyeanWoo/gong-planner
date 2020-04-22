import React from 'react'
import ReactModal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';

const withHomeTodoModal = WrappedComponent => {
  return (props) => {
    const customStyles = {
      content : {
        top                   : '40%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        zIndex                : "50",
      }
    };

    const [showModal, setshowModal] = React.useState(false);
    const handleOpenModal = () => setshowModal(true);
    const handleCloseModal = () => {
      setTimeout(()=> setshowModal(false))
    }

    return (
      <>
      <button onClick={handleOpenModal} style={{ opacity: 0, zIndex: 0, height: "100%", width: "100%", position: "absolute"}}></button>
      <ReactModal 
          isOpen={showModal}
          contentLabel="reuse-modal"
          ariaHideApp={false}
          onRequestClose={handleCloseModal}
          style={customStyles}
      >
        <WrappedComponent {...props} handleCloseModal={handleCloseModal}/>
        <button onClick={handleCloseModal}>닫기</button>
      </ReactModal>
    </>
    )
  }
}

export default withHomeTodoModal;