import React from 'react';
import withModal from '../../HOC/withModal'

const SubjectEditModal = ({subject}) => {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState(subject.subjectColor);

  const handleChangeName = e => {
    setName(e.target.value);
  }

  const handleChangeColor = e => {
    setColor(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, color);
  }

  return(
    <div className="subject-modal">
      <div>과목 편집</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subjectName">과목명</label>
        <input type="text" id="subjectName" onChange={handleChangeName} placeholder={subject.subjectName}/>
        <label htmlFor="subjectColor">과목색상</label>
        <div style={{backgroundColor: color}}>&nbsp;</div>
        <input type="text" id="subjectColor" onChange={handleChangeColor}/>
        <input type="submit" value="" style={{ visibility: "hidden"}}/>
      </form>
    </div>
  )
}

// delete, add, submit
const options = [true, false, true];
export default withModal("*",options)(SubjectEditModal);