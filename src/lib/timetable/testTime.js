const Timetable = require("./index.js");
// console.log(new Date(2020, 2, 17, 13, 30, 0));

let TimeData = [{
    start: +new Date(2020, 2, 17, 13, 30, 0), //월이 0부터 시작함
    end: +new Date(2020, 2, 17, 15, 50, 0), // 월이 0부터 시작함
    color: "green"
  },
  {
    start: +new Date(2020, 2, 17, 5, 20, 0), //월이 0부터 시작함
    end: +new Date(2020, 2, 17, 7, 50, 0), // 월이 0부터 시작함
    color: "blue"
  },
  {
    start: +new Date(2020, 2, 17, 8, 0, 0), //월이 0부터 시작함
    end: +new Date(2020, 2, 17, 13, 50, 0), // 월이 0부터 시작함
    color: "pink"
  }
];

let TimeData2 = [{
    start: +new Date(2020, 2, 17, 12, 00, 0), //월이 0부터 시작함
    end: +new Date(2020, 2, 17, 14, 40, 0), // 월이 0부터 시작함
    color: "black"
  },
  {
    start: +new Date(2020, 2, 17, 4, 10, 0), //월이 0부터 시작함
    end: +new Date(2020, 2, 17, 8, 50, 0), // 월이 0부터 시작함
    color: "white"
  }

];

const time = new Timetable();
time.addTime(TimeData);
time.addTime(TimeData2);
console.log(time.studyTime);