import { signInWithEmailAndPassword } from 'firebase/auth';

import { FIREBASE_AUTH } from '../../FirebaseConfig';

const auth = FIREBASE_AUTH;

export const loginUser = async (user = {}) => {
	try {
		await signInWithEmailAndPassword(auth, user?.email, user?.password)
			.then((res) => {})
			.catch((error) => {
				throw error;
			});
	} catch (error) {
		console.log('loginUser');
		throw error;
	}
};
