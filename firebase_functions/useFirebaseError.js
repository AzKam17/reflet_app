import { useState } from 'react';

// Hook personnalisé pour la gestion des erreurs Firebase
const useFirebaseError = () => {
	const [errorMessage, setErrorMessage] = useState(null);

	// Fonction pour définir l'erreur en fonction du code Firebase
	const setErrorByFirebaseCode = (firebaseErrorCode) => {
		let message = '';
		switch (firebaseErrorCode) {
			case 'auth/email-already-in-use':
				message = 'Cette adresse mail est déjà utilisée.';
				break;
			case 'auth/missing-email':
				message = 'Email requis !';
				break;
			case 'auth/missing-password':
				message = 'Mot de passe requis !';
				break;
			case 'auth/weak-password':
				message = 'Veuillez choisir un mot de passe plus long.';
				break;
			case 'auth/invalid-email':
				message = 'Veuillez entrer une adresse mail valide.';
				break;
			case 'auth/invalid-login-credentials':
				message = 'Identifiants invalides.';
				break;
			case 'ERREUR_UTILISATEUR_VIDE':
				message = "Veuillez rentrer un nom d'utilisateur.";
				break;
			default:
				message = 'Une erreur est survenue.';
				break;
		}
		setErrorMessage(message);
	};

	// Fonction pour réinitialiser l'erreur
	const resetFirebaseError = () => {
		setErrorMessage(null);
	};

	return [errorMessage, setErrorByFirebaseCode, resetFirebaseError]; // Retourne un tableau
};

export default useFirebaseError;
