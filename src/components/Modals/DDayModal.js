import React from 'react';
import './TodayLogModal.css';
import DayjsUtils from '@date-io/dayjs';
import withTodayModal from '../../HOC/withTodayModal';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { updateTodayLog } from '../../firebase/todayFunction';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

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

export default withTodayModal(DDayModal);