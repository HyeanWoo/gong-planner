import React, { useState, useEffect } from 'react';
import TodayDate from '../components/TodayDate';
import EditSetting from '../components/EditSetting';
import Todaylog from '../components/Todaylog';
import Subjects from '../components/Subjects';
import Timetable from '../components/Timetable';

const Home = (props) => {
  const { todayData, onChangeTodayData } = props;
  const collectionName = props.match.params.colName;

	return (
		<div className='center home'>
			<div className='row'>
				<div className='col s5 offset-s2'>
					<TodayDate date={todayData.date} onChangeDate={onChangeTodayData} />
				</div>
				<div className='col s3'>
					<EditSetting />
				</div>
			</div>
			<Todaylog todayData={todayData} />
			<div className='row'>
				<Subjects today={todayData.date} subjects={todayData.subjects} />
				<Timetable today={todayData.date} timeTable={todayData.timeTable ? todayData.timeTable : []} />
			</div>
		</div>
	);
};

export default Home;
