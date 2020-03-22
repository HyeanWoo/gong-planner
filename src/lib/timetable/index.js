const dayjs = require('./node_modules/dayjs');

class TimeTable {
  constructor(studyTime = []) {
    this.studyTime = studyTime;
  }

  sort() {
    return this.studyTime.sort((a, b) => {
      return a.start - b.start;
    });
  }

  push(time) {
    // 이후시간보다 이전시간이 클경우 바꿈
    if (time.end < time.start) {
      [time.start, time.end] = [time.end, time.start];
    }

    // 예외처리
    const check = this.check(time);
    if (typeof check === "object") {
      return check;
    } else if (this.isEndDayNext(time)) {
      time.end = dayjs(time.end).hour(23).minute(59).second(59);
    }

    this.studyTime.push(time);
    this.sort();

    return this.studyTime;
  }

  remove(time) {
    for (let i = 0; i < this.studyTime.length; ++i) {
      if (this.studyTime[i].start === time.start) {
        this.studyTime.splice(i, 1);
        return;
      }
    }
  }

  isEndDayNext(time) {
    // time.end가 다음 날(day)이면 true
    return dayjs(time.start).diff(dayjs(time.end), "day") < 0;
  }

  isValid(timeArray) {

  }

  check(time) {
    this.studyTime.forEach(study => {
      if ((time.start < study.start && time.start <= study.end) ||
        (time.start >= study.end)) {
        // GOOD
      } else {
        // 충돌이 나는 studyTime을 반환
        return study;
      }
    });

    return true;
  }

  addTime(timeData) {
    // 예외처리
    if (Array.isArray(timeData)) {
      // 배열일 경우
      timeData.forEach(data => {
        const check = this.check(data);
        if (typeof check === "object") {
          return check;
        }
      });
      timeData.forEach(data => this.push(data));
    } else {
      // 객체일 경우
      this.push(timeData);
    }

    return this.studyTime;
  }
}

module.exports = TimeTable;