import React from 'react';
import withModal from '../../HOC/withModal'

const TodoEditModal = () => {

  const handleChange = e => {
    e.preventDefault();
  }

  return(
    <div className="todo-modal">
      <div>할일 편집</div>
      <form onSubmit={handleChange}>
        <label htmlFor="subjectName">할일</label>
        <input type="text" id="subjectName"/>
        <label htmlFor="subjectName">상태</label>
      </form>
    </div>
  )
}

// delete, add, submit
const options = [true, false, true];
export default withModal("*",options)(TodoEditModal);