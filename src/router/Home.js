import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import TodayDate from '../components/TodayDate';
import EditSetting from '../components/EditSetting';
import Todaytotal from '../components/Todaytotal';
import Todaylog from '../components/Todaylog';
import Subjects from '../components/Subjects';
import Timetable from '../components/Timetable';
import { getTodayData } from '../firebase/todayFuntion';

const Home = () => {
	let today = dayjs();
	let [ todayData, setTodayData ] = useState({});

	const changeDateCallback = (date) => {
		if (date) today = date;

		const strToday = today.format('YY.MM.DD');
		console.log(strToday, '정보를 받아오는중..');

		getTodayData(strToday).then((data) => {
			console.log(data);
			setTodayData(data ? data : {});
		});
	};
	useEffect(changeDateCallback, []);

	return (
		<div className='center home'>
			<div className='row'>
				<div className='col s5 offset-s2'>
					<TodayDate onChangeDate={changeDateCallback} />
				</div>
				<div className='col s3'>
					<EditSetting />
				</div>
			</div>
			<Todaylog todayData={todayData} />
			<div className='row'>
				<Subjects />
				{/* <Timetable/> */}
			</div>
		</div>
	);
};

export default Home;
