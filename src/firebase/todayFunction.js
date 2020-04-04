import firebase from './index';

// 해당 날짜 정보 가져오기
// 날짜 정보가 없으면 새로 만듦
export async function getTodayData(collectionName, date) {
	const db = firebase.firestore();
	const doc = db.collection(collectionName).doc(date);
	try {
		let subRef = await doc.get();

		if (!subRef.exists) {
			await doc.set({
				dDay: 0,
				score: 0,
				totalStudyTime: 0,
				wordToday: '',
				subjects: {},
				timeTable: []
			});
			subRef = await doc.get();
		}

		console.log(subRef.data());
		console.log('Get today docs OK');
		return subRef.data();
	} catch (err) {
		console.error('Error getting documents', err);
	}
}
