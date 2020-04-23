import React from 'react'
import ReactModal from 'react-modal';
import Button from '@material-ui/core/Button';

const withModal = (buttonName) => WrappedComponent => {
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
    const handleOpenModal = () => setshowModal(true);
    const handleCloseModal = () => setshowModal(false);

    return (
      <>
      <Button variant="outlined" size="small" onClick={handleOpenModal}>{buttonName}</Button>
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

export default withModal;