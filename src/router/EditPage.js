import React from 'react'
import { Link } from 'react-router-dom';

const EditPage = () => {
  return (
    <div className="edit-page center">
      <p>This is Edit Page</p>
      <p><Link to="/">X</Link></p>
    </div>
  );
}

export default EditPage;