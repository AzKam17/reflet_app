import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserInFirestore } from './createUserInFirestore';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
const auth = FIREBASE_AUTH;

export const createUserInFireAuth = async (user) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			user.email,
			user.password
		);
		await createUserInFirestore({ ...user, uid: userCredential?.user?.uid });
		return userCredential.user; // Renvoie l'utilisateur créé
	} catch (error) {
		console.log('createUserInFireAuth');
		throw error;
	}
};
