import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const TodayDate = ({ date, onChangeDate }) => {
	const dateFormat = 'YYYY. MM. DD.';

	const onClickArrowBack = () => onChangeDate(date.subtract(1, 'day'));
	const onClickArrowForward = () => onChangeDate(date.add(1, 'day'));

	return (
		<React.Fragment>
			<ArrowBackIosIcon className="prevDate" onClick={onClickArrowBack} />
			{date.format(dateFormat)}
			<ArrowForwardIosIcon className="nextDate" onClick={onClickArrowForward} />
		</React.Fragment>
	);
};

export default TodayDate;
