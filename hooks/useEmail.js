import { useState } from 'react';

// Créez un hook personnalisé pour gérer la valeur de l'email avec validation
function useEmail() {
	// Utilisez useState pour stocker la valeur de l'email et son statut de validité
	const [email, setEmail] = useState('');
	const [isValid, setIsValid] = useState(true);

	// Créez une fonction pour mettre à jour la valeur de l'email et vérifier sa validité
	function setEmailValue(newEmail) {
		setEmail(newEmail);

		// Utilisez une expression régulière (regex) pour valider l'e-mail
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		const valid = emailRegex.test(newEmail);

		setIsValid(valid);
	}

	// Renvoyez la valeur de l'email, la fonction pour la mettre à jour et son statut de validité
	return [email, setEmailValue, isValid]; // Inversez la valeur de isValid
}

export default useEmail;
