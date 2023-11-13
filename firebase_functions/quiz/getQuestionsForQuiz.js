import {
	query,
	where,
	collection,
	getDocs,
	doc,
	getDoc,
	ref,
} from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

export const getQuestionsForQuiz = async (quizId) => {
	try {
		const firestore = FIRESTORE;
		const quizOptionsCollection = collection(firestore, 't_quiz_options');
		const quizRef = doc(firestore, 't_quiz', quizId);

		const quizOptionsQuery = query(
			quizOptionsCollection,
			where('quiz', '==', quizRef)
		);

		const querySnapshot = await getDocs(quizOptionsQuery);

		const questions = [];
		for (const doc of querySnapshot.docs) {
			const data = doc.data();
			const questionId = doc.id; // Récupérez l'ID du document

			questions.push({
				...data,
				id: questionId, // Ajoutez l'ID de la question
			});
		}

		return questions;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des questions pour le quiz :',
			error
		);
		throw error;
	}
};
