import React from 'react';
import { Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import TodayDate from '../components/TodayDate';
import EditSetting from '../components/EditSetting';
import Todaylog from '../components/Todaylog';
import Subjects from '../components/Subjects';
// import Timetable from '../components/Timetable';
import CvsTimetable from '../components/CvsTimetable';

const RootGrid = styled(Grid)({
	height: '100vh',
	flexDirection: 'column',
	flexWrap: 'nowrap'
});
const HeaderGrid = styled(Grid)({
	display: 'flex',
	height: '64px',
	justifyContent: 'space-between',
	flexWrap: 'nowrap'
});
const LogGrid = styled(Grid)({});
const BottomGrid = styled(Grid)({
	height: '100%',
	'& div': {
		height: '100%'
	}
});

const Home = props => {
	const { onChangeTodayData } = props;
	const todayData = props.todayData || {};
	const collectionName = props.match ? props.match.params.colName : 'testSubject';

	return (
		<RootGrid container spacing={1}>
			<HeaderGrid item>
				<TodayDate date={todayData.date} onChangeDate={onChangeTodayData} />
				<EditSetting colName={collectionName} />
			</HeaderGrid>
			<LogGrid item>
				<Todaylog todayData={todayData} />
			</LogGrid>
			<BottomGrid item container spacing={1}>
				<Grid item xs={6}>
					<Subjects today={todayData.date} subjects={todayData.subjects} />
				</Grid>
				<Grid item xs={6}>
					{/* <Timetable today={todayData.date} timeTable={todayData.timeTable ? todayData.timeTable : []} /> */}
					<CvsTimetable timeTable={todayData.timeTable ? todayData.timeTable : []} />
				</Grid>
			</BottomGrid>
		</RootGrid>
	);
};

export default Home;
