import React from 'react';
import withModal from '../../HOC/withModal'

const SubjectAddModal = () => {
  const [color, setColor] = React.useState("#FF0000");

  const handleColor = e => {
    setColor(e.target.value);
  }

  const handleChange = e => {
    e.preventDefault();
  }

  return(
    <div className="subject-modal">
      <div>과목 추가</div>
      <form onSubmit={handleChange}>
        <label htmlFor="subjectName">과목명</label>
        <input type="text" id="subjectName"/>
        <label htmlFor="subjectColor">과목색상</label>
        <div style={{backgroundColor: color}}>&nbsp;</div>
        <input type="text" id="subjectColor" onChange={handleColor}/>
      </form>
    </div>
  )
}

// delete, add, submit
const options = [false, true, false];
export default withModal("+과목추가",options)(SubjectAddModal);