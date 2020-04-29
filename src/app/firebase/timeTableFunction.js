import firebase from './index';
import _ from 'lodash';

// 해당 날짜의 공부 기록들 가져오기
export async function getTimeTable(collectionName, date) {
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
export function addTimeTable(collectionName, date, timeTable) {
	const db = firebase.firestore();
	return db
		.collection(collectionName)
		.doc(date)
		.update({
			timeTable: timeTable ? firebase.firestore.FieldValue.arrayUnion(timeTable) : []
		})
		.then(async function() {
			console.log('Add timeTable Field OK');
			return await getTimeTable(collectionName, date);
		})
		.catch(function(err) {
			console.log('Add timeTable Error', err);
			return false;
		});
}

// 공부 기록 '배열 아이템' 수정
// -> 삭제 후 추가하는 방식
export function updateTimeTable(collectionName, date, timeTable, updated) {
	const db = firebase.firestore();

	return db
		.collection(collectionName)
		.doc(date)
		.update({
			timeTable: firebase.firestore.FieldValue.arrayRemove({
				start: firebase.firestore.Timestamp.fromDate(timeTable.start),
				end: firebase.firestore.Timestamp.fromDate(timeTable.end),
				subject: timeTable.subject
			})
		})
		.then(function() {
			return db
				.collection(collectionName)
				.doc(date)
				.update({
					timeTable: firebase.firestore.FieldValue.arrayUnion(updated)
				})
				.then(async function() {
					console.log('Update timeTable Field OK');
					return await getTimeTable(collectionName, date);
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
export async function deleteTimeTable(collectionName, date, timeTable) {
	const db = firebase.firestore();
	// console.log(timeTable);
	// const table = await getTimeTable(collectionName, date);
	// _.find(table, study => {
	// 				return ~~(study.start.toMillis() / 1000) === ~~(+timeTable.start / 1000);
	// 			})
	return db
		.collection(collectionName)
		.doc(date)
		.update({
			timeTable: firebase.firestore.FieldValue.arrayRemove({
				start: firebase.firestore.Timestamp.fromDate(timeTable.start),
				end: firebase.firestore.Timestamp.fromDate(timeTable.end),
				subject: timeTable.subject
			})
		})
		.then(async function() {
			console.log('Delete timeTable Field OK');
			return await getTimeTable(collectionName, date);
		})
		.catch(function(err) {
			console.log('Delete timeTable Error', err);
		});
}
