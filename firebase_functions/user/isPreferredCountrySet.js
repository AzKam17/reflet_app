import { FIRESTORE } from '../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const firestore = FIRESTORE;

export const isPreferredCountrySet = async (userId) => {
	try {
		const userRef = doc(firestore, 'users', userId);
		const userSnapshot = await getDoc(userRef);

		if (userSnapshot.exists()) {
			const userData = userSnapshot.data();
			const preferredCountry = userData?.preferredCountry;

			if (preferredCountry !== null && preferredCountry !== undefined) {
				return true;
			}
		}

		return false;
	} catch (error) {
		console.log("isPreferredCountrySet - Une erreur s'est produite :", error);
		throw error;
	}
};
