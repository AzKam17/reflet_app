import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

// Fonction pour incrémenter la propriété 'partyCount' dans un document t_quiz par ID.
export const incrementPartyCount = async (quizId) => {
	const quizDocRef = doc(FIRESTORE, 't_quiz', quizId);

	try {
		// Récupérez le document t_quiz.
		const quizDoc = await getDoc(quizDocRef);

		if (quizDoc.exists()) {
			// Le document existe, récupérez sa valeur actuelle de 'partyCount'.
			const currentPartyCount = quizDoc.data().partyCount;

			// Incrémentez 'partyCount' de 1 (ou de la valeur souhaitée).
			const newPartyCount = currentPartyCount + 1;

			// Mettez à jour la propriété 'partyCount' dans le document.
			await updateDoc(quizDocRef, { partyCount: newPartyCount });

			return newPartyCount; // Retourne la nouvelle valeur de 'partyCount' après l'incrémentation.
		} else {
			return null;
		}
	} catch (error) {
		console.error("Erreur lors de l'incrémentation de partyCount :", error);
		throw error;
	}
};
