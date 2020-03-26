import React, { useState } from 'react';
import dayjs from 'dayjs';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const TodayDate = ({ onChangeDate }) => {
	const [ date, setDate ] = useState(dayjs());
	const dateFormat = 'YYYY. MM. DD.';

	const onClickArrowBack = () => {
		setDate((prevState) => {
			const changedDate = prevState.subtract(1, 'day');
			onChangeDate(changedDate);
			return changedDate;
		});
	};

	const onClickArrowForward = () => {
		setDate((prevState) => {
			const changedDate = prevState.add(1, 'day');
			onChangeDate(changedDate);
			return changedDate;
		});
	};

	return (
		<React.Fragment>
			<ArrowBackIosIcon className="prevDate" onClick={onClickArrowBack} />
			{date.format(dateFormat)}
			<ArrowForwardIosIcon className="nextDate" onClick={onClickArrowForward} />
		</React.Fragment>
	);
};

export default TodayDate;
