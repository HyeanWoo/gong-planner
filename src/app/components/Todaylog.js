import React, { useState } from 'react';
import _ from 'lodash';
import { Box, Grid, Paper } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import WordTodayModal from './Modals/WordTodayModal';
import DDayModal from './Modals/DDayModal';
import ScoreProgressModal from './Modals/ScoreProgressModal';
import { updateTodayLog } from '../firebase/todayFunction';
import { secondToTime } from '../utils';
import dayjs from 'dayjs';

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

const Todaylog = ({ colName, date, todayData }) => {
  let shortDate = date.format('YY.MM.DD');
  // 공부 시간 변환(초단위 시간 -> 00:00:00)
  let totalStr = '00:00:00';

  if (todayData.subjects) {
    const totalStudyTime = _.sum(_.map(todayData.subjects, 'totalElapsedTime'));
    totalStr = secondToTime(totalStudyTime);
    // 공부시간 서버에 업데이트하는 함수인데 너무 자주 떠서 주석처리 함
    // updateTodayLog(colName, shortDate, "TOTAL_STUDY_TIME", totalStudyTime);
  }

  const makeState = init => useState.call(this, init).reduce((value, set) => { return { value, set } });
  
  const logVariables = {
    wordToday:     makeState(todayData.wordToday),
    dDay:          makeState(todayData.dDay),
    scoreProgress: makeState(todayData.score ? todayData.score : 0),
  }

  const modalStates = {
    wordToday:     makeState(false),
    dDay:          makeState(false),
    scoreProgress: makeState(false),
  };
  
  const dDayCalc = () => {
    if(logVariables.dDay.value === undefined || logVariables.dDay.value === 0) {
      return '디데이없음';
    }

    let dday = typeof(logVariables.dDay.value) === "string" ? dayjs(logVariables.dDay.value, "YYYY. MM. DD") : logVariables.dDay.value;
    let today = dayjs().hour(0).minute(0).second(0).millisecond(0);
    let ddayResult = Math.floor(today/86400000 - dday/86400000);
    if(Number(dday)===Number(today)) {
      return "D-Day";
    } else if(Number(dday) < Number(today)) {
      return `D+${ddayResult}`;
    } else {
      return "D" + (ddayResult);
    }
  }

  return (
    <React.Fragment>
      <RootGrid container spacing={1}>
        <Grid item container spacing={1}>
          <FixedHeightGrid item xs onClick={() => modalStates.wordToday.set(true)}>
            <WordToday variant='outlined'>
              {logVariables.wordToday.value ? logVariables.wordToday.value : '-'}
            </WordToday>
          </FixedHeightGrid>
          <FixedHeightGrid item xs  onClick={() => modalStates.dDay.set(true)}>
            <DDay variant='outlined'>
              {dDayCalc()}
            </DDay>
          </FixedHeightGrid>
        </Grid>
        <Grid item container spacing={1}>
          <FixedHeightGrid item xs onClick={() => modalStates.scoreProgress.set(true)}>
            <Score variant='outlined'>
              <Box p={1} display='flex' alignItems='center'>
                <Box flexGrow='1'>
                  <ScoreProgress
                    barcolor={
                      logVariables.scoreProgress.value >= 7
                      ? 'LimeGreen'
                      : logVariables.scoreProgress.value >= 4
                        ? '#ffb300'
                        : '#ff0000'
                      }
                      variant='determinate'
                      value={logVariables.scoreProgress.value * 10}
                  />
                </Box>
                <Box p={0.5}>{logVariables.scoreProgress.value}</Box>
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
      <WordTodayModal
        colName={colName}
        date={shortDate}
        value={logVariables.wordToday.value}
        setValue={logVariables.wordToday.set}
        showModal={modalStates.wordToday.value}
        closeModal={() => modalStates.wordToday.set(false)}
      />
      <DDayModal
        colName={colName}
        date={shortDate}
        value={logVariables.dDay.value}
        setValue={logVariables.dDay.set}
        showModal={modalStates.dDay.value}
        closeModal={() => modalStates.dDay.set(false)}
      />
      <ScoreProgressModal
        colName={colName}
        date={shortDate}
        value={logVariables.scoreProgress.value}
        setValue={logVariables.scoreProgress.set}
        showModal={modalStates.scoreProgress.value}
        closeModal={() => modalStates.scoreProgress.set(false)}
      />
    </React.Fragment>
  );
};

export default Todaylog;
