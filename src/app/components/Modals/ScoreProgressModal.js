import React from 'react';
import './TodayLogModal.css';
import withTodayModal from '../../HOC/withTodayModal';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { updateTodayLog } from '../../firebase/todayFunction';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

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

export default withTodayModal(ScoreProgressModal);