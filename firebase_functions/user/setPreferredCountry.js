import { FIRESTORE } from '../../FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const firestore = FIRESTORE;

export const setPreferredCountry = async (userId, preferredCountryIsoCode) => {
	try {
		const userRef = doc(firestore, 'users', userId);
		await updateDoc(userRef, {
			prefered_country: preferredCountryIsoCode,
		});
	} catch (error) {
		console.log('setPreferredCountry - ');
		throw error;
	}
};
