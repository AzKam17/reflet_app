import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

export const getAllAvailableQuizzes = async () => {
	try {
		const quizCollection = collection(FIRESTORE, 't_quiz');

		const quizQuery = query(quizCollection, where('available', '==', true));

		const querySnapshot = await getDocs(quizQuery);

		const availableQuizzes = [];
		querySnapshot.forEach((doc) => {
			// Récupérez l'ID du document.
			const quizId = doc.id;
			// Ajoutez les quiz disponibles à la liste avec leur ID.
			availableQuizzes.push({ id: quizId, ...doc.data() });
		});

		return availableQuizzes;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des quiz disponibles :',
			error
		);
		throw error;
	}
};
