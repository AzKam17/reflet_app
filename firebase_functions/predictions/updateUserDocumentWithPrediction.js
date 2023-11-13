import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

export async function updateUserDocumentWithPrediction(
	userId,
	predictionId,
	choice
) {
	try {
		// Référence au document de l'utilisateur dans la collection "t_user"
		const userRef = doc(FIRESTORE, 'users', userId);

		// Obtenir le document de l'utilisateur
		const userDoc = await getDoc(userRef);

		if (!userDoc.exists()) {
			console.error('Utilisateur non trouvé');
			return;
		}

		// Mettre à jour le tableau "predictions" dans le document de l'utilisateur
		const userData = userDoc.data();
		const existingPredictions = userData.predictions || [];
		existingPredictions.push({ prediction_id: predictionId, choice });

		// Mettre à jour les données de l'utilisateur
		await updateDoc(userRef, { predictions: existingPredictions });

		console.log('Document utilisateur mis à jour avec succès.');
	} catch (error) {
		console.error(
			'Erreur lors de la mise à jour du document utilisateur :',
			error
		);
	}
}
