import React from 'react';
import './TodayLogModal.css';
import DayjsUtils from '@date-io/dayjs';
import withTodayModal from '../../HOC/withTodayModal';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { updateTodayLog } from '../../firebase/todayFunction';

const DDayModal = ({ colName, date, value, setValue, closeModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(dday);
    updateTodayLog(colName, date, "D_DAY", dday.format('YYYY. MM. DD.'));
    closeModal();
    // handleReRendering();
  }

  const handleClose = () => {
    closeModal();
  }

  const [dday, setDday] = React.useState(value);
  const handleDateChange = date => setDday(date);

  return(
    <div className="dday-modal">
      <div className="title">D-day 편집</div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="subjectName">d-day</label>
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <KeyboardDatePicker
            format="YYYY. MM. DD"
            value={dday}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <button className="todaylog-btn" type="submit" style={{float: "right"}}>완료</button>
        <button className="todaylog-btn" type="button" onClick={handleClose}>닫기</button>
      </form>
    </div>
  )
}

export default withTodayModal(DDayModal);