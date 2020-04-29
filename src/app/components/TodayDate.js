import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

const TodayDateBox = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
});

const TodayDate = ({ date, onChangeDate }) => {
	const dateFormat = 'YYYY. MM. DD.';

	const onClickArrowBack = () => onChangeDate(date.subtract(1, 'day'));
	const onClickArrowForward = () => onChangeDate(date.add(1, 'day'));

	return (
		<TodayDateBox>
			<IconButton onClick={onClickArrowBack}>
				<ArrowBackIosRoundedIcon />
			</IconButton>
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
			<IconButton onClick={onClickArrowForward}>
				<ArrowForwardIosRoundedIcon />
			</IconButton>
		</TodayDateBox>
	);
};

export default TodayDate;
