import React from 'react'

const Todaylog = () => {
  return(
    <div className="row todaylog">
      <div className="col s5 offset-s2 green one-word">
        오늘의 한마디
      </div>
      <div className="col s3 blue d-day">
        <div>D-day</div> 
        <div>만족도</div>
      </div>
    </div>
  );
}

export default Todaylog;