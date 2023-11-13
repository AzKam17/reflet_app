import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

// Fonction pour mettre à jour la propriété "onboardingCommunaute" d'un utilisateur
export const updateUserOnboardingCommunaute = async (userId) => {
	const userRef = doc(FIRESTORE, 'users', userId);
	console.log('updateUserOnboardingCommunaute ', userId);
	try {
		// Si le document existe, met à jour la propriété "onboardingCommunaute"
		await updateDoc(userRef, {
			onboardingCommunaute: true,
		});
	} catch (error) {
		console.error(
			'Erreur lors de la mise à jour de la propriété "onboardingCommunaute" :',
			error
		);
	}
};
