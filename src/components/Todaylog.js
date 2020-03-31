import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Box, Grid, Paper } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

const FixedHeightGrid = styled(Grid)({
	height: '48px',
	overflow: 'hidden'
});
const CenterPaper = styled(Paper)({
	display: 'flex',
	padding: '0 8px 0 8px',
	height: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '16px',
	overflow: 'hidden',
	fontWeight: props => props.fontWeight,
	'& span': {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	}
});

const WordToday = CenterPaper;
const DDay = CenterPaper;
const TotalScoreTime = CenterPaper;

const ScoreProgress = styled(LinearProgress)({
	height: '16px',
	backgroundColor: props => props.backColor || '#e0e0e0',
	'& div': { backgroundColor: props => props.barColor }
});
const Score = styled(Paper)({
	height: '100%',
	fontSize: '16px',
	fontWeight: props => props.fontWeight
});

const Todaylog = ({ todayData }) => {
	const { wordToday, dDay, score, totalStudyTime } = todayData;

	// 공부 시간 변환(초단위 시간 -> 00:00:00)
	let totalStr = '';
	if (_.isNumber(totalStudyTime) && totalStudyTime > 0) {
		const second = totalStudyTime % 60;
		const rest = ~~(totalStudyTime / 60);
		const minute = ~~(rest % 60);
		const hour = ~~(rest / 60);
		totalStr = `${(hour + '').padStart(2, '0')}
				:
				${(minute + '').padStart(2, '0')}
				:
				${(second + '').padStart(2, '0')}`;
	}

	return (
		<Grid container spacing={1}>
			<Grid item container spacing={1}>
				<FixedHeightGrid item xs className='green'>
					<WordToday variant='outlined'>
						<span>{wordToday ? wordToday : '한마디없음ㅜ'}</span>
					</WordToday>
				</FixedHeightGrid>
				<FixedHeightGrid item xs className='blue'>
					<DDay variant='outlined'>
						<span>{dDay ? dDay : '디데이없음ㅠ'}</span>
					</DDay>
				</FixedHeightGrid>
			</Grid>
			<Grid item container spacing={1}>
				<FixedHeightGrid item xs className='yellow'>
					<Score variant='outlined'>
						{score ? (
							<Box p={1} display='flex' alignItems='center'>
								<Box flexGrow='1'>
									<ScoreProgress
										barColor={score >= 7 ? 'LimeGreen' : score >= 4 ? '#ffb300' : '#e57373'}
										variant='determinate'
										value={score * 10}
									/>
								</Box>
								<Box p={0.5}>{score}</Box>
							</Box>
						) : (
							'만족도없는부분'
						)}
					</Score>
				</FixedHeightGrid>
				<FixedHeightGrid item xs>
					<TotalScoreTime fontWeight='bold' variant='outlined'>
						<span>{totalStr ? totalStr : '공부한시간이없어!'}</span>
					</TotalScoreTime>
				</FixedHeightGrid>
			</Grid>
		</Grid>
	);
};

export default Todaylog;
