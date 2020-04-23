import React from 'react'
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';


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
      <Button onClick={handleOpenModal} style={{ opacity: 0, zIndex: 0, height: "100%", width: "100%", position: "absolute"}}></Button>
      <ReactModal 
          isOpen={showModal}
          contentLabel="reuse-modal"
          ariaHideApp={false}
          onRequestClose={handleCloseModal}
          style={customStyles}
      >
        <WrappedComponent {...props} handleCloseModal={handleCloseModal}/>
      </ReactModal>
      </>
    )
  }
}

export default withHomeTodoModal;