import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

export async function countUniqueUserIdsInGroupMessages(groupId) {
	const firestore = FIRESTORE;
	const messagesRef = collection(firestore, 't_messages');

	const groupMessagesQuery = query(messagesRef, where('group', '==', groupId));
	const uniqueUserIds = new Set();

	const querySnapshot = await getDocs(groupMessagesQuery);
	querySnapshot.forEach((doc) => {
		const message = doc.data();
		if (message.uid) {
			uniqueUserIds.add(message.uid);
		}
	});

	return uniqueUserIds.size;
}
