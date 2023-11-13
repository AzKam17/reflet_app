import { FIREBASE_AUTH } from '../../FirebaseConfig';

export const logoutUser = async () => {
	FIREBASE_AUTH.signOut().then(() => {
		console.log('[logoutUser] - Déconnexion');
	});
};
