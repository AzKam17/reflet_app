import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

// Fonction pour récupérer la liste des matchs tabs depuis Firestore
const getMatchTabsList = async () => {
	try {
		const tabsRef = collection(FIRESTORE, 't_matchs_tabs');
		const querySnapshot = await getDocs(tabsRef);

		const matchTabsList = [];
		querySnapshot.forEach((doc) => {
			matchTabsList.push({
				id: doc.id,
				...doc.data(),
			});
		});

		return matchTabsList;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération de la liste des matchs tabs :',
			error
		);
		return [];
	}
};

export { getMatchTabsList };
