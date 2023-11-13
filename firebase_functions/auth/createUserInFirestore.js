import { doc, setDoc } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

const firestore = FIRESTORE;

export const createUserInFirestore = async (user) => {
	try {
		await setDoc(doc(firestore, 'users', user.uid), {
			uid: user.uid,
			email: user.email,
			username: user.username,
			points: 5,
			predictions: [],
			quiz: [],
		});
	} catch (error) {
		console.log('createUserInFirestore');
		throw error;
	}
};
