import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import TodayDate from '../components/TodayDate';
import EditSubjectList from '../components/EditSubjectList';

const Edit = (props) => {
  const { todayData, onChangeSubjects } = props;
  const [date, setDate] = useState(todayData.date);
  const colName = _.isEmpty(props.match)
    ? 'testSubject'
    : props.match.params.colName;

  useEffect(() => {
    setDate(props.todayData.date);
  }, [props.todayData.date]);

  return (
    <div className='center edit'>
      <div className='row'>
        <div className='col s4 offset-s4'>This is Edit Page</div>
        <div className='col s1 offset-11'>
          <Link to={'/' + colName}>X</Link>
        </div>
      </div>
      <div className='row'>
        <TodayDate date={date} onChangeDate={setDate} />
      </div>
      <div className='row'>
        <EditSubjectList
          todayData={todayData}
          onChangeSubjects={onChangeSubjects}
          colName={colName}
          date={date.format('YY.MM.DD')}
        />
      </div>
    </div>
  );
};

export default Edit;
