import dayjs from 'dayjs';

class TimeTable {
	constructor(timeTable = []) {
		this.originTime = timeTable;
		this.studyTime = [];
		// this.parse(timeTable);
		this.refinedTimetable = timeTable.map(time => {
			if (time.start.seconds > time.end.seconds) {
				[ time.start.seconds, time.end.seconds ] = [ time.end.seconds, time.start.seconds ];
			}

			return {
				...time,
				start: dayjs(time.start.toDate()),
				end: dayjs(time.end.toDate())
			};
		});
		this.toOneArray(this.refinedTimetable);
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
      color: "과목"
    }, ...]
  */
	parse(timeTable = []) {
		const studyTime = [ ...Array(24) ].map(x => [ ...Array(60) ].map(x => undefined));
		console.log(timeTable);
		timeTable.forEach(time => {
			let diffMin = time.end.diff(time.start, 'minute');

			console.log(time.start.hour(), time.start.minute());
			console.log(time.end.hour(), time.end.minute());
			console.log(diffMin);

			let hour = time.start.hour();
			let minute = time.start.minute();
			while (diffMin > 0) {
				let last;
				if (diffMin + minute > 60) {
					last = 60;
				} else if (hour < time.end.hour() && time.end.minute() === 0) {
					last = 60;
				} else {
					last = time.end.minute();
				}
				studyTime[hour++].fill(time.color, minute, last);
				diffMin -= last - minute;
				minute = 0;
			}
		});
		this.studyTime = studyTime;
	}

	toOneArray(timeTable = []) {
		const studyTime = [ ...Array(24) ].map(x => []);
		timeTable.forEach(time => {
			let diffMin = time.end.diff(time.start, 'minute');

			let hour = time.start.hour();
			let minute = time.start.minute();
			while (diffMin > 0) {
				let last;
				if (diffMin + minute > 60) {
					last = 60;
				} else if (hour < time.end.hour() && time.end.minute() === 0) {
					last = 60;
				} else {
					last = time.end.minute();
				}
				studyTime[hour++].push({
					color: time.color,
					subject: time.subject,
					start: minute,
					end: last,
					startDayjs: time.start,
					endDayjs: time.end
				});
				diffMin -= last - minute;
				minute = 0;
			}
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
		this.studyTime.forEach(study => {
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
			timeData.forEach(data => {
				const check = this.check(data);
				if (typeof check === 'object') {
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

export default TimeTable;
