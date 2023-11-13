import { FIRESTORE } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const firestore = FIRESTORE;

export const getAllChatsTabs = async () => {
	try {
		const chatTabsCollection = collection(firestore, 't_chats_tabs');
		const chatTabsQuerySnapshot = await getDocs(chatTabsCollection);

		const chatTabsData = [];

		chatTabsQuerySnapshot.forEach((doc) => {
			const chatTab = doc.data();
			chatTab.id = doc.id; // Ajout de la clé 'id' avec l'ID du document
			chatTabsData.push(chatTab);
		});

		return chatTabsData;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des onglets de discussion :',
			error
		);
		throw error;
	}
};
