import React from 'react'
import Todaytotal from '../components/Todaytotal';
import Todaylog from '../components/Todaylog';
import Subjects from '../components/Subjects';
import Timetable from '../components/Timetable';

const Home = () => {
    return(
        <div className="center home">
            <Todaytotal/>
            <Todaylog/>
            <div className="row">
              <Subjects/>
              {/* <Timetable/> */}
            </div>
        </div>
    );
}

export default Home;