import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import TodayDate from '../components/TodayDate';
import EditSetting from '../components/EditSetting';
import Todaylog from '../components/Todaylog';
import Subjects from '../components/Subjects';
import Timetable from '../components/Timetable';

const Home = props => {
	const { todayData, onChangeTodayData } = props;
	const collectionName = props.match.params.colName || 'testSubject';

	return (
		<Grid container justify='center'>
			<Grid item container xs={12}>
				<Grid item xs>
					<TodayDate date={todayData.date} onChangeDate={onChangeTodayData} />
				</Grid>
				<Grid item xs>
					<EditSetting />
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Todaylog todayData={todayData} />
			</Grid>
			<Grid item container xs={12}>
				<Grid item xs>
					<Subjects today={todayData.date} subjects={todayData.subjects} />
				</Grid>
				<Grid item xs>
					{/* <Timetable today={todayData.date} timeTable={todayData.timeTable ? todayData.timeTable : []} /> */}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Home;
