import React from 'react';
import './TodayLogModal.css';
import withTodayModal from '../../HOC/withTodayModal';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { updateTodayLog } from '../../firebase/todayFunction';

const ScoreProgressModal = ({ colName, date, value, setValue, closeModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(score)
    updateTodayLog(colName, date, "SCORE_PROGRESS", score);
    closeModal();
    // handleReRendering();
  }
  
  const handleClose = () => {
    closeModal();
  }
  
  const [score, setScore] = React.useState(value);
  const handleChange = (e, newValue) => setScore(newValue);

  return(
    <div className="scoreprogress-modal">
      <div className="title">만족도 편집</div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="subjectName">만족도</label>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={score}
              aria-labelledby="continuous-slider" 
              onChange={handleChange}
              step={0.1}
              min={0}
              max={10}
              // valueLabelDisplay="on"
            />
          </Grid>
          <Grid item>
            <input
              type="number"
              value={score}
              readOnly
              style={{width: "36px"}}
            />
          </Grid>
        </Grid>
        <button type="submit" style={{float: "right"}}>완료</button>
        <button type="button" onClick={handleClose}>닫기</button>
      </form>
    </div>
  )
}

export default withTodayModal(ScoreProgressModal);