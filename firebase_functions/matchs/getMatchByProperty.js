import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

export const getMatchByProperty = async (propertyName, propertyValue) => {
	const matchsRef = collection(FIRESTORE, 't_matchs');

	const matchsQuery = query(
		matchsRef,
		where(propertyName, '==', propertyValue)
	);

	try {
		const querySnapshot = await getDocs(matchsQuery);
		const matchs = [];

		querySnapshot.forEach((doc) => {
			matchs.push({ id: doc.id, ...doc.data() });
		});

		return matchs;
	} catch (error) {
		console.error('Erreur lors de la récupération des matchs :', error);
		return null;
	}
};
