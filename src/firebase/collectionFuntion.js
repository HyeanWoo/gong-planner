import firebase from './index'

// name에 해당하는 콜렉션 가져오기
export async function getCollection(name) {
  const db = firebase.firestore();
  try {
    let all = db.collection(name);
    let snapshot = await all.get();
    let data = snapshot.docs.map(doc => {
      return { [doc.id] : doc.data() }
    })
    return data;
  } catch(err) {
    console.log(err);
  }
}