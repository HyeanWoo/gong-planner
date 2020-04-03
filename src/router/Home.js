import React from 'react';
import { Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import TodayDate from '../components/TodayDate';
import EditSetting from '../components/EditSetting';
import Todaylog from '../components/Todaylog';
import Subjects from '../components/Subjects';
// import Timetable from '../components/Timetable';
import CvsTimetable from '../components/CvsTimetable';

const RootGrid = styled(Grid)({});
const HeaderGrid = styled(Grid)({
	height: '64px',
	justifyContent: 'space-between'
});
const LogGrid = styled(Grid)({
	margin: '8px 0 8px 0'
});

const Home = props => {
	const { todayData, onChangeTodayData } = props;
	const collectionName = props.match.params.colName || 'testSubject';

	return (
		<RootGrid container>
			<HeaderGrid item container xs={12}>
				<TodayDate date={todayData.date} onChangeDate={onChangeTodayData} />
				<EditSetting colName={collectionName} />
			</HeaderGrid>
			<LogGrid item xs={12}>
				<Todaylog todayData={todayData} />
			</LogGrid>
			<Grid item container spacing={1}>
				<Grid item xs>
					<Subjects today={todayData.date} subjects={todayData.subjects} />
				</Grid>
				<Grid item xs>
					{/* <Timetable today={todayData.date} timeTable={todayData.timeTable ? todayData.timeTable : []} /> */}
					<CvsTimetable timeTable={todayData.timeTable ? todayData.timeTable : []} />
				</Grid>
			</Grid>
		</RootGrid>
	);
};

export default Home;
