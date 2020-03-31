import React from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const IconBox = styled(Box)({
	cursor: 'pointer'
});

const TodayDate = ({ date, onChangeDate }) => {
	const dateFormat = 'YYYY. MM. DD.';

	const onClickArrowBack = () => onChangeDate(date.subtract(1, 'day'));
	const onClickArrowForward = () => onChangeDate(date.add(1, 'day'));

	return (
		<Box display='flex'>
			<IconBox onClick={onClickArrowBack}>
				<ArrowBackIosIcon className='prevDate' />
			</IconBox>
			<MuiPickersUtilsProvider utils={DayjsUtils}>
				<KeyboardDatePicker
					format='YYYY. MM. DD.'
					value={date.format(dateFormat)}
					onChange={onChangeDate}
					KeyboardButtonProps={{
						'aria-label': 'change date'
					}}
				/>
			</MuiPickersUtilsProvider>
			<IconBox onClick={onClickArrowForward}>
				<ArrowForwardIosIcon className='nextDate' />
			</IconBox>
		</Box>
	);
};

export default TodayDate;
