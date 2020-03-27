import React from 'react';
import withModal from '../../HOC/withModal'

const SubjectAddModal = () => {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("#FF0000");

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
      <div>과목 추가</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subjectName">과목명</label>
        <input type="text" id="subjectName" onChange={handleChangeName}/>
        <label htmlFor="subjectColor">과목색상</label>
        <div style={{backgroundColor: color}}>&nbsp;</div>
        <input type="text" id="subjectColor" onChange={handleChangeColor}/>
        <input type="submit" value="" style={{ visibility: "hidden"}}/>
      </form>
    </div>
  )
}

// delete, add, submit
const options = [false, true, false];
export default withModal("+과목추가",options)(SubjectAddModal);