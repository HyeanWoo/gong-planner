import firebase from './index';

// 해당 날짜 정보 가져오기
export async function getTodayData(date) {
	const db = firebase.firestore();
	try {
		let subRef = await db.collection('testSubject').doc(date).get();
		console.log('Get today docs OK');
		return subRef.data();
	} catch (err) {
		console.error('Error getting documents', err);
	}
}
