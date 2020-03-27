import React from 'react';
import { Line } from 'rc-progress';

const Todaylog = ({ todayData }) => {
	const { wordToday, dDay, score, totalStudyTime } = todayData;

	const scoreObj = {
		percent: score*10,
		color: score > 7 ? "LimeGreen" : score <= 4 ? "coral" : "LightGreen"
	}

	return (
		<React.Fragment>
			<div className='row todaylog'>
				<div className='col s5 offset-s2 green one-word'>
					<div>{wordToday ? wordToday : '한마디없음ㅜ'}</div>
				</div>
				<div className='col s3 blue d-day'>
					<div>{dDay ? dDay : '디데이없음ㅠ'}</div>
				</div>
			</div>
			<div className='row todaylog'>
				<div className='col s5 offset-s2 yellow one-word'>
					<div style={{display: 'flex'}} >{score ? 
						<React.Fragment>
							<div style={{flex: "1"}}>
							<Line
								percent={scoreObj.percent}
								strokeWidth="2"
					 			strokeColor={scoreObj.color} />
							</div>
							<span style={{width: '30px'}}>{score}</span>
						</React.Fragment> : '만족도없는부분'}</div>
				</div>
				<div className='col s3 pink d-day'>
					<div>{totalStudyTime ? totalStudyTime : '공부한시간이없어!'}</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Todaylog;
