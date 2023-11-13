import {
	collection,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { FIRESTORE } from '../../../FirebaseConfig';

const firestore = FIRESTORE;
export const listenLastGroupData = (groupIsoCode, onData) => {
	// Référence à la collection 't_messages'
	const messagesCollectionRef = collection(firestore, 't_messages');

	// Créer une requête pour filtrer les documents où 'group' est égal à 'groupIsoCode'
	const q = query(
		messagesCollectionRef,
		where('group', '==', groupIsoCode),
		orderBy('sendedAt', 'desc'), // Tri dans l'ordre décroissant par 'sendedAt'
		limit(1) // Limite les résultats à 1 pour obtenir le dernier message
	);

	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		if (!querySnapshot.empty) {
			// Le résultat est un tableau de documents, prenez le premier (et seul) document
			const lastMessage = querySnapshot.docs[0].data();
			onData(lastMessage);
		} else {
			// Aucun document ne correspond au critère
			onData(null);
		}
	});

	return unsubscribe;
};
