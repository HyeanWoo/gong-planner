import React, { useState } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Grid, FormControl, Select, InputLabel, MenuItem, FormHelperText, Box } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import ReactModal from 'react-modal';
import { addTimeTable } from '../../firebase/timeTableFunction';

const TimetableModal = props => {
	const { date, colName, show, handleModal, onSetTimeTable, subjects, role } = props;
	const [ startTime, setStartTime ] = useState(dayjs(date));
	const [ endTime, setEndTime ] = useState(dayjs(date).add(1, 'hour'));

	const customStyles = {
		content: {
			top: '40%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)'
		}
	};

	const handleChangeName = e => setName(e.target.value);
	const handleChangeStartTime = time => setStartTime(time);
	const handleChangeEndTime = time => setEndTime(time);
	const handleCloseModal = () => handleModal(false);

	const handleRemove = e => {
		e.preventDefault();
		console.log('삭제 미구현');
		handleCloseModal();
	};
	const handleSubmit = e => {
		e.preventDefault();
		const shortDate = date.format('YY.MM.DD');
		addTimeTable(colName, shortDate, {
			start: startTime.toDate(),
			end: endTime.toDate(),
			subject: name
		}).then(res => {
			// 색깔 넣어주기
			const timeTable = _.map(res, time => {
				const subObj = _.find(subjects, { subjectName: time.subject });
				console.log(subObj);
				return {
					...time,
					color: subObj ? subObj.subjectColor : 'black'
				};
			});
			onSetTimeTable(timeTable);
		});
		handleCloseModal();
	};

	let subjectNames = [];
	if (!_.isEmpty(subjects)) {
		subjectNames = _.values(subjects).map(subject => subject.subjectName);
	}
	const [ name, setName ] = useState(subjectNames[0] || '');
	return (
		<ReactModal
			isOpen={show}
			contentLabel='reuse-modal'
			ariaHideApp={false}
			onRequestClose={handleCloseModal}
			style={customStyles}>
			<div className='timetable-modal'>
				<div>공부기록 추가</div>
				<form onSubmit={handleSubmit} noValidate>
					{!_.isEmpty(subjectNames) ? (
						<React.Fragment>
							<FormControl required size='medium'>
								<InputLabel>과목명</InputLabel>
								<Select
									autoWidth={true}
									labelId='label'
									value={subjectNames[0]}
									onChange={handleChangeName}>
									{subjectNames.map(subjectName => (
										<MenuItem value={subjectName}>{subjectName}</MenuItem>
									))}
								</Select>
								<FormHelperText>필수항목</FormHelperText>
							</FormControl>
							<MuiPickersUtilsProvider utils={DayjsUtils}>
								<Grid container direction='column'>
									<KeyboardTimePicker
										id='start-time-picker'
										label='시작 시간'
										value={startTime}
										onChange={handleChangeStartTime}
										margin='dense'
										KeyboardButtonProps={{
											'aria-label': 'change time'
										}}
									/>
									<KeyboardTimePicker
										id='end-time-picker'
										label='종료 시간'
										value={endTime}
										onChange={handleChangeEndTime}
										margin='dense'
										KeyboardButtonProps={{
											'aria-label': 'change time'
										}}
									/>
								</Grid>
							</MuiPickersUtilsProvider>
						</React.Fragment>
					) : (
						<Box>과목이 없습니다. 편집 화면에서 과목을 추가해주세요.</Box>
					)}

					{role === 'edit' ? <button name='del' value='삭제' onClick={handleRemove} /> : <React.Fragment />}
					<button onClick={handleCloseModal}>닫기</button>
					{role === 'add' && !_.isEmpty(subjectNames) ? <input type='submit' name='add' value='추가' /> : ''}
					{role === 'edit' && !_.isEmpty(subjectNames) ? <input type='submit' name='sub' value='완료' /> : ''}
				</form>
			</div>
		</ReactModal>
	);
};

export default TimetableModal;
