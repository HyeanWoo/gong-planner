import React from 'react';
import _ from 'lodash';
import { Box, Grid, Paper } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

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

  return (
    <RootGrid container spacing={1}>
      <Grid item container spacing={1}>
        <FixedHeightGrid item xs>
          <WordToday variant='outlined'>
            {wordToday ? wordToday : '-'}
          </WordToday>
        </FixedHeightGrid>
        <FixedHeightGrid item xs>
          <DDay variant='outlined'>
            {dDay !== undefined ? dDay : '디데이없음'}
          </DDay>
        </FixedHeightGrid>
      </Grid>
      <Grid item container spacing={1}>
        <FixedHeightGrid item xs>
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
