import React from 'react';
import { Grid } from '@material-ui/core';
import { Line } from 'rc-progress';

const Todaylog = ({ todayData }) => {
	const { wordToday, dDay, score, totalStudyTime } = todayData;

	const scoreObj = {
		percent: score * 10,
		color: score > 7 ? 'LimeGreen' : score <= 4 ? 'coral' : 'LightGreen'
	};

	return (
		<Grid container>
			<Grid item container>
				<Grid item xs className='green'>
					{wordToday ? wordToday : '한마디없음ㅜ'}
				</Grid>
				<Grid item xs className='blue'>
					{dDay ? dDay : '디데이없음ㅠ'}
				</Grid>
			</Grid>
			<Grid item container>
				<Grid item xs className='yellow'>
					<div style={{ display: 'flex' }}>
						{score ? (
							<React.Fragment>
								<div style={{ flex: '1' }}>
									<Line percent={scoreObj.percent} strokeWidth='2' strokeColor={scoreObj.color} />
								</div>
								<span style={{ width: '30px' }}>{score}</span>
							</React.Fragment>
						) : (
							'만족도없는부분'
						)}
					</div>
				</Grid>
				<Grid item xs className='pink'>
					{totalStudyTime ? totalStudyTime : '공부한시간이없어!'}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Todaylog;
