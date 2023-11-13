import {
	doc,
	updateDoc,
	getFirestore,
	increment,
	getDoc,
} from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

// Assurez-vous d'importer ou de configurer correctement votre objet Firestore (FIRESTORE).

export const selectUserAndAddPoints = async (userId, pointsToAdd) => {
	const firestore = FIRESTORE;
	const userDocRef = doc(firestore, 'users', userId);

	try {
		// Récupérez le document utilisateur
		const userDocSnapshot = await getDoc(userDocRef);

		if (userDocSnapshot.exists()) {
			// Mettez à jour la propriété "points" avec la valeur incrémentée
			await updateDoc(userDocRef, {
				points: increment(pointsToAdd),
			});
			console.log("Points ajoutés avec succès à l'utilisateur !");
		} else {
			console.error("L'utilisateur avec cet ID n'existe pas.");
		}
	} catch (error) {
		console.error(
			"Erreur lors de la mise à jour des points de l'utilisateur :",
			error
		);
		throw error;
	}
};
