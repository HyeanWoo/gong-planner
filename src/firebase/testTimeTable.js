const firebaseConfig = require('./firebase.json');
const firebase = require('firebase/app');
require('firebase/firestore');

firebase.initializeApp(firebaseConfig);

// 해당 날짜의 공부 기록들 가져오기
async function getTimeTable(collectionName, date) {
	const db = firebase.firestore();
	try {
		let subRef = await db.collection(collectionName).doc(date).get();
		let { timeTable } = subRef.data();
		console.log('Get timetable docs OK');
		return timeTable;
	} catch (err) {
		console.error('Error getting documents', err);
	}
}

// 공부 기록 '배열 아이템'(시작시간, 끝시간, 과목) 추가
function addTimeTable(collectionName, date, timeTable) {
	const db = firebase.firestore();
	db
		.collection(collectionName)
		.doc(date)
		.update({
			timeTable: timeTable ? firebase.firestore.FieldValue.arrayUnion(timeTable) : []
		})
		.then(function() {
			console.log('Add timeTable Field OK');
		})
		.catch(function(err) {
			console.log('Add timeTable Error', err);
		});
}

// 공부 기록 '배열 아이템' 수정
// -> 삭제 후 추가하는 방식
function updateTimeTable(collectionName, date, timeTable, updated) {
	const db = firebase.firestore();

	db
		.collection(collectionName)
		.doc(date)
		.update({
			timeTable: firebase.firestore.FieldValue.arrayRemove(timeTable)
		})
		.then(function() {
			db
				.collection(collectionName)
				.doc(date)
				.update({
					timeTable: firebase.firestore.FieldValue.arrayUnion(updated)
				})
				.then(function() {
					console.log('Update timeTable Field OK');
				})
				.catch(function(err) {
					console.log('Update timeTable Error', err);
				});
		})
		.catch(function(err) {
			console.log('Update timeTable Error', err);
		});
}

// 공부 기록 '배열 아이템' 삭제
function deleteTimeTable(collectionName, date, timeTable) {
	const db = firebase.firestore();
	db
		.collection(collectionName)
		.doc(date)
		.update({
			timeTable: timeTable ? firebase.firestore.FieldValue.arrayRemove(timeTable) : []
		})
		.then(function() {
			console.log('Delete timeTable Field OK');
		})
		.catch(function(err) {
			console.log('Delete timeTable Error', err);
		});
}

// test code
const dummy = {
	start: new Date(2020, 2, 21, 8, 37),
	end: new Date(2020, 2, 21, 9, 48),
	subject: '영어'
};

const dummy2 = {
	start: new Date(2020, 2, 21, 10, 23),
	end: new Date(2020, 2, 21, 12, 38),
	subject: '국어'
};

const dummy3 = {
	start: new Date(2020, 2, 21, 15, 2),
	end: new Date(2020, 2, 21, 16, 32),
	subject: '영어'
};

const collectionName = 'testSubject';
const date = '20.03.21';

// 테이블 가져오기
// getTimeTable(collectionName, date).then((timeTable) => {
// 	console.log(timeTable);
// });

// 아무것도 없는 빈 배열로 만들기
// addTimeTable(collectionName, date);

// 더미 추가
// addTimeTable(collectionName, date, dummy);
// addTimeTable(collectionName, date, dummy2);
// addTimeTable(collectionName, date, dummy3);

// 업데이트
// updateTimeTable(collectionName, date, dummy2, dummy);
// updateTimeTable(collectionName, date, dummy, dummy2);

// 삭제
// deleteTimeTable(collectionName, date, dummy);
