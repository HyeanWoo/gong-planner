import React from 'react';
import Button from '@material-ui/core/Button';
import EditSubjectList from '../components/EditSubjectList';
import SubjectAddModal from '../components/Modals/SubjectAddModal';

const Edit = props => {
  const goBack = () => {
    props.history.goBack();
  }

  const colName = props.match.params.colName;
  
  return (
    <div className="center edit">
      <div className="row">
        <div className="col s4 offset-s4">
          This is Edit Page
        </div>
        <div className="col s1 offset-11">
          <button onClick={goBack}>X</button>
        </div>
      </div>
      <div className="row">
          <Button onClick={() => {console.log("Yesterday")}}>
            <span role='img' aria-label='yesterday'>🌗</span>
          </Button>
          <span>2020-03-24</span>
          <Button onClick={() => {console.log("Tomrrow")}}>
            <span role='img' aria-label='tommorow'>🌓</span>
          </Button>
      </div>
      <div className="row">
        <EditSubjectList colName={colName}/>
      </div>
      <div className="row">
        <SubjectAddModal/>
      </div>
    </div>
  );
}

export default Edit;