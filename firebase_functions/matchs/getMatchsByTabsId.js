import { query, collection, where, getDocs } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

export const getMatchsByTabsId = async (tabsId) => {
	const matchsRef = collection(FIRESTORE, 't_matchs');

	const matchsQuery = query(matchsRef, where('cx_tabs_id_ref', '==', tabsId));

	try {
		const querySnapshot = await getDocs(matchsQuery);
		const matchs = [];

		querySnapshot.forEach((doc) => {
			// Ajoute l'ID du document à la donnée du match
			matchs.push({ id: doc.id, ...doc.data() });
		});

		return matchs;
	} catch (error) {
		console.error('Erreur lors de la récupération des matchs :', error);
		return null;
	}
};
