import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const TodayDate = ({ date, onChangeDate }) => {
	const dateFormat = 'YYYY. MM. DD.';

	const onClickArrowBack = () => onChangeDate(date.subtract(1, 'day'));
	const onClickArrowForward = () => onChangeDate(date.add(1, 'day'));

	return (
		<React.Fragment>
			<ArrowBackIosIcon className="prevDate" onClick={onClickArrowBack} />
			<MuiPickersUtilsProvider utils={DayjsUtils}>
				<KeyboardDatePicker
					format="YYYY. MM. DD."
					value={date.format(dateFormat)}
					onChange={onChangeDate}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
			<ArrowForwardIosIcon className="nextDate" onClick={onClickArrowForward} />
		</React.Fragment>
	);
};

export default TodayDate;
