import React from 'react';
import './TodayLogModal.css';
import withTodayModal from '../../HOC/withTodayModal';
import { updateTodayLog } from '../../firebase/todayFunction';

const WordTodayModal = ({ colName, date, value, setValue, closeModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(wordToday);
    updateTodayLog(colName, date, "WORD_TODAY", wordToday);
    closeModal();
    // handleReRendering();
  }
  
  const handleClose = () => {
    // debugger;
    // setTimeout(() => closeModal());
    closeModal();
  }
  
  const [wordToday, setWordToday] = React.useState(value);
  const handleChange = e => setWordToday(e.target.value);

  return(
    <div className="wordToday-modal">
      <div className="title">오늘의 한마디 편집</div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="subjectName">오늘의 한마디</label>
        <input type="text" className="input-tag" onChange={handleChange} value={wordToday}/>
        <button className="todaylog-btn" type="submit" style={{float: "right"}}>완료</button>
        <button className="todaylog-btn" type="button" onClick={handleClose}>닫기</button>
      </form>
    </div>
  )
}

export default withTodayModal(WordTodayModal);