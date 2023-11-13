import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

const db = FIRESTORE;
export async function sendMessage(
	group,
	message,
	uid,
	userName,
	prefered_country,
	reply_message = null
) {
	const messagesRef = collection(db, 't_messages');

	// Crée un objet représentant le message
	const newMessage = {
		group,
		message,
		sendedAt: serverTimestamp(), // Utilisez serverTimestamp pour obtenir l'heure du serveur
		uid,
		user: doc(db, 'users', uid), // Crée une référence Firestore à l'utilisateur
		userName,
		prefered_country,
		reply_message,
	};

	try {
		// Ajoute le message à la collection "t_messages"
		await addDoc(messagesRef, newMessage);
	} catch (error) {
		console.error("Erreur lors de l'envoi du message :", error);
	}
}
