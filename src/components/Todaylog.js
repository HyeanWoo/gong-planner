import React from 'react';

const Todaylog = ({ todayData }) => {
	const { wordToday, dDay, score, totalStudyTime } = todayData;
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
					<div>{score ? score : '만족도없는부분'}</div>
				</div>
				<div className='col s3 pink d-day'>
					<div>{totalStudyTime ? totalStudyTime : '공부한시간이없어!'}</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Todaylog;
