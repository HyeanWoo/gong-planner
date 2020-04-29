import React from 'react';
import withModal from '../../HOC/withModal';
import { TwitterPicker } from 'react-color';
import {
  getData,
  updateSubject,
  deleteSubject,
} from '../../firebase/subjectFuntion';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const SubjectEditModal = ({
  subjectId,
  colName,
  date,
  subject,
  handleCloseModal,
  reRenderSubject,
}) => {
  const [name, setName] = React.useState(subject.subjectName);
  const [color, setColor] = React.useState(subject.subjectColor);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeColor = (color) => {
    setColor(color.hex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSubject(colName, date, 'EDIT_SUBJECT', subjectId, name, color);
    handleCloseModal();
    handleReRendering();
  };

  const handleDelete = async () => {
    await deleteSubject(colName, date, subjectId);
    handleCloseModal();
    handleReRendering();
  };

  const handleReRendering = async () => {
    const tmpSubs = await getData(colName, date);
    reRenderSubject(tmpSubs);
  };

  return (
    <div className='subject-modal'>
      <div>과목 편집</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='subjectName'>과목명</label>
        <input
          type='text'
          id='subjectName'
          onChange={handleChangeName}
          value={name}
          placeholder={subject.subjectName}
          required
        />
        <label htmlFor='subjectColor'>과목색상</label>
        <div style={{ backgroundColor: color }}>&nbsp;</div>
        <TwitterPicker
          color={color}
          onChangeComplete={handleChangeColor}
          triangle='hide'
        />
        <div className="modal-buttons" style={{textAlign: "center", marginTop: "12px"}}>
          <Button
            type='button'
            onClick={handleDelete} 
            size="small"
            variant="contained" 
            color="secondary"
            startIcon={<DeleteIcon />}
            style={{ float: 'left'}}
          >
          제거
          </Button>
          <Button
            type="button"
            onClick={handleCloseModal}
            size="small"
            variant="outlined"
          >
          닫기
          </Button>
          <Button
            type='submit'
            size="small"
            variant="outlined" 
            color="primary" 
            startIcon={<BorderColorIcon />}
            style={{ float: 'right' }}
          >
          수정
          </Button>
        </div>
      </form>
    </div>
  );
};

export default withModal('*')(SubjectEditModal);
