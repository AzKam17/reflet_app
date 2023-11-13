import { FIRESTORE } from '../../FirebaseConfig';
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc,
} from 'firebase/firestore';

const firestore = FIRESTORE;

export const getTabsInGroup = async (chatTabId) => {
	try {
		const tabsGroupCollection = collection(firestore, 't_tabs_group');
		const chatTabReference = doc(firestore, 't_chats_tabs', chatTabId);

		const q = query(tabsGroupCollection, where('tab', '==', chatTabReference));
		const tabsGroupQuerySnapshot = await getDocs(q);

		const tabsGroupData = [];

		tabsGroupQuerySnapshot.forEach((doc) => {
			const data = doc.data();
			data.id = doc.id;
			tabsGroupData.push(data);
		});

		return tabsGroupData;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des onglets de groupe :',
			error
		);
		throw error;
	}
};
