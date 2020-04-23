import React from 'react';
import dayjs from 'dayjs';
import withModal from '../../HOC/withModal';
import { TwitterPicker } from 'react-color';
import { getData, createSubject } from '../../firebase/subjectFuntion';
import Button from '@material-ui/core/Button';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const SubjectAddModal = ({
  colName,
  date,
  handleCloseModal,
  reRenderSubject,
}) => {
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState('#FF0000');

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeColor = (color) => setColor(color.hex);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = +dayjs();
    await createSubject(colName, date, id, name, color);
    handleCloseModal();
    handleReRendering();
  };

  const handleReRendering = async () => {
    const tmpSubs = await getData(colName, date);
    reRenderSubject(tmpSubs);
  };

  return (
    <div className='subject-modal'>
      <div>과목 추가</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='subjectName'>과목명</label>
        <input
          type='text'
          id='subjectName'
          onChange={handleChangeName}
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
          추가
          </Button>
        </div>
      </form>
    </div>
  );
};

export default withModal('+과목추가')(SubjectAddModal);
