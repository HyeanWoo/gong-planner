import React, { useState } from 'react';
import _ from 'lodash';
import { Box, Grid, Paper } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import WordTodayModal from '../components/Modals/WordTodayModal';

import { secondToTime } from '../utils';

const RootGrid = styled(Grid)({});

const FixedHeightGrid = styled(Grid)({
  height: '48px',
  overflow: 'hidden',
});
const CenterPaper = styled(Paper)({
  display: 'flex',
  padding: '0 8px 0 8px',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  overflow: 'hidden',
  fontWeight: (props) => props.fontWeight,
  '& span': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

const WordToday = CenterPaper;
const DDay = CenterPaper;
const TotalScoreTime = CenterPaper;

const ScoreProgress = styled(LinearProgress)({
  height: '16px',
  backgroundColor: (props) => props.backColor || '#e0e0e0',
  '& div': { backgroundColor: (props) => props.barcolor },
});
const Score = styled(Paper)({
  height: '100%',
  fontSize: '16px',
  fontWeight: (props) => props.fontWeight,
});

const Todaylog = ({ todayData }) => {
  const { wordToday, dDay } = todayData;
  const score = todayData.score ? todayData.score : 0;

  // 공부 시간 변환(초단위 시간 -> 00:00:00)
  let totalStr = '00:00:00';

  if (todayData.subjects) {
    const totalStudyTime = _.sum(_.map(todayData.subjects, 'totalElapsedTime'));
    totalStr = secondToTime(totalStudyTime);
  }
  
  // 모달 처리 함수
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const handleOpenModal1 = () => setShowModal1(true);
  const handleOpenModal2 = () => setShowModal2(true);
  const handleOpenModal3 = () => setShowModal3(true);
  const handleCloseModal1 = () => setShowModal1(false);
  const handleCloseModal2 = () => setShowModal2(false);
  const handleCloseModal3 = () => setShowModal3(false);

  return (
    <RootGrid container spacing={1}>
      <Grid item container spacing={1}>
        <FixedHeightGrid item xs onClick={handleOpenModal1}>
          <WordToday variant='outlined'>
            {wordToday ? wordToday : '-'}
          </WordToday>
          <WordTodayModal showModal={showModal1} closeModal={handleCloseModal1} />
        </FixedHeightGrid>
        <FixedHeightGrid item xs  onClick={()=>console.log("DDay")}>
          <DDay variant='outlined'>
            {dDay !== undefined ? dDay : '디데이없음'}
          </DDay>
          {/* <DDayModal showModal={showModal2} openModal={handleOpenModal2} closeModal={handleCloseModal2}/> */}
        </FixedHeightGrid>
      </Grid>
      <Grid item container spacing={1}>
        <FixedHeightGrid item xs onClick={()=>console.log("ScoreProgress")}>
          <Score variant='outlined'>
            <Box p={1} display='flex' alignItems='center'>
              <Box flexGrow='1'>
                <ScoreProgress
                  barcolor={
                    score >= 7
                      ? 'LimeGreen'
                      : score >= 4
                      ? '#ffb300'
                      : '#e57373'
                  }
                  variant='determinate'
                  value={score * 10}
                />
              </Box>
              <Box p={0.5}>{score}</Box>
            </Box>
          </Score>
          {/* <ScoreProgressModal showModal={showModal3} openModal={handleOpenModal3} closeModal={handleCloseModal3}/> */}
        </FixedHeightGrid>
        <FixedHeightGrid item xs>
          <TotalScoreTime fontWeight='bold' variant='outlined'>
            {totalStr}
          </TotalScoreTime>
        </FixedHeightGrid>
      </Grid>
    </RootGrid>
  );
};

export default Todaylog;
