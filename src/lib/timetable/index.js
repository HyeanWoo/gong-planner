const dayjs = require('dayjs');

class TimeTable {
	constructor(timeTable = []) {
		this.originTime = timeTable;
		this.studyTime = [];
		this.parse(timeTable);
	}

	sort() {
		return this.studyTime.sort((a, b) => {
			return a.start - b.start;
		});
	}

	/*
    입력 : [{
      start: dayjs()
      end: dayjs()
      subject: "과목"
    }, ...]
  */
	parse(timeTable = []) {
		const studyTime = [ ...Array(24) ].map((x) => [ ...Array(60) ].map((x) => undefined));
		timeTable.forEach((time) => {
			const diffMin = time.end.diff(time.start, 'minute');

			// console.groupCollapsed(ii);
			// console.log(time.start.hour(), time.start.minute());
			// console.log(time.end.hour(), time.end.minute());
			// console.log(diffMin);

			const startHourIndex = time.start.hour();
			const endHourIndex = time.end.hour();
			if (diffMin > 0) {
				const diffHour = time.end.diff(time.start, 'hour');
				studyTime[startHourIndex].fill(time.subject, time.start.minute());
				for (let i = 1; i < diffHour; ++i) {
					studyTime[startHourIndex + i].fill(time.subject);
				}
				studyTime[endHourIndex].fill(time.subject, 0, time.end.minute());
			} else {
				studyTime[startHourIndex].fill(time.subject, time.start.minute(), time.end.minute());
			}

			// console.groupEnd();
		});
		this.studyTime = studyTime;
	}

	push(time) {
		// 이후시간보다 이전시간이 클경우 바꿈
		if (time.end < time.start) {
			[ time.start, time.end ] = [ time.end, time.start ];
		}

		// 예외처리
		const check = this.check(time);
		if (typeof check === 'object') {
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
		return dayjs(time.start).diff(dayjs(time.end), 'day') < 0;
	}

	isValid(timeArray) {}

	check(time) {
		this.studyTime.forEach((study) => {
			if ((time.start < study.start && time.start <= study.end) || time.start >= study.end) {
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
			timeData.forEach((data) => {
				const check = this.check(data);
				if (typeof check === 'object') {
					return check;
				}
			});
			timeData.forEach((data) => this.push(data));
		} else {
			// 객체일 경우
			this.push(timeData);
		}

		return this.studyTime;
	}
}

module.exports = TimeTable;
