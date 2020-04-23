import React from 'react';
import './TodayLogModal.css';
import withTodayModal from '../../HOC/withTodayModal';
import { updateTodayLog } from '../../firebase/todayFunction';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

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
        <div className="todaylog-btn">
          <Button
            type="button"
            onClick={handleClose}
            size="small"
            variant="outlined"
          >
          닫기
          </Button>
          <Button
            type='submit'
            size="small"
            variant="outlined" 
            color="primary" 
            startIcon={<EditIcon />}
            style={{ float: 'right' }}
          >
          완료
          </Button>
        </div>
      </form>
    </div>
  )
}

export default withTodayModal(WordTodayModal);