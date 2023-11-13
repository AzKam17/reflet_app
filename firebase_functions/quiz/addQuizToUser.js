import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

export async function addQuizToUser(userId, quizId) {
	try {
		const userDocRef = doc(FIRESTORE, 'users', userId);

		// Use the arrayUnion function to add the quiz ID to the "quiz" array
		await updateDoc(userDocRef, {
			quiz: arrayUnion(quizId),
		});

		//console.log(`Quiz ID added to user ${userId} successfully.`);
	} catch (error) {
		console.error(`Error adding quiz ID to user ${userId}:`, error);
	}
}
