import React from 'react';
// import withTodayModal from '../../HOC/withTodayModal';
import ReactModal from 'react-modal';

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

const WordTodayModal = ({showModal, closeModal}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name)

    closeModal();
    // handleReRendering();
  }

  const handleClose = (e) => {
    e.preventDefault();
    closeModal();
    console.log("Is this btn work?")
  }

  return(
    <ReactModal 
      isOpen={showModal}
      contentLabel="reuse-today-modal"
      ariaHideApp={false}
      onRequestClose={closeModal}
      style={customStyles}
     >
    <div className="wordToday-modal">
      <div>오늘의 한마디 편집</div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="subjectName">한마디</label>
        <input type="text" id="wordToday"/>
        <button name="btn_submit" type="submit" style={{float: "right"}}>완료</button>
        <button name="btn_close" type="button" onClick={handleClose}>닫기</button>
      </form>
    </div>
    </ReactModal>

  )
}

// export default withTodayModal(WordTodayModal);
export default WordTodayModal;