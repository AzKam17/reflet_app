import {
	collection,
	query,
	where,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

const db = FIRESTORE;

export function subscribeToMessagesByGroup(group, callback) {
	const messagesRef = collection(db, 't_messages');
	const q = query(
		messagesRef,
		where('group', '==', group), // Filtrer par groupe
		orderBy('sendedAt', 'asc') // Tri par date croissante
	);

	return onSnapshot(q, (snapshot) => {
		const messages = [];
		snapshot.forEach((doc) => {
			messages.push({ id: doc.id, ...doc.data() });
		});

		// Appeler la fonction de rappel (callback) avec les messages triés par date
		callback(messages);
	});
}
