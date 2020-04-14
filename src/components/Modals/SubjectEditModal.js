import React from 'react';
import withModal from '../../HOC/withModal';
import { TwitterPicker } from 'react-color';
import { getData, updateSubject, deleteSubject } from '../../firebase/subjectFuntion';

const SubjectEditModal = ({subjectId, colName, date, subject, handleCloseModal, reRenderSubject}) => {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState(subject.subjectColor);

  const handleChangeName = e => {
    setName(e.target.value);
  }

  const handleChangeColor = color => {
    setColor(color.hex);
  }

  const handleSubmit = e => {
    e.preventDefault();
    updateSubject(colName, date, "EDIT_SUBJECT", subjectId, name, color);
    handleCloseModal();
    handleReRendering();
  }

  const handleDelete = () => {
    deleteSubject(colName, date, subjectId);
    handleCloseModal();
    handleReRendering();
  }

  const handleReRendering = async () => {
    const tmpSubs = await getData(colName, date);
    reRenderSubject(tmpSubs);
  }

  return(
    <div className="subject-modal">
      <div>과목 편집</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subjectName">과목명</label>
        <input type="text" id="subjectName" onChange={handleChangeName} placeholder={subject.subjectName} required/>
        <label htmlFor="subjectColor">과목색상</label>
        <div style={{backgroundColor: color}}>&nbsp;</div>
        <TwitterPicker
          color={color}
          onChangeComplete={handleChangeColor}
          triangle="hide"
        />
        <button type="submit" style={{float: "right"}}>수정</button>
        <button type="button" onClick={handleDelete} style={{float: "right", backgroundColor: "red"}}>제거</button>
      </form>
    </div>
  )
}

export default withModal("*")(SubjectEditModal);