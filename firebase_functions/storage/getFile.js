import { getDownloadURL, ref } from 'firebase/storage';
import { FIREBASE_STORAGE } from '../../FirebaseConfig';

export async function getFile(reference) {
	try {
		const imageRef = ref(FIREBASE_STORAGE, reference);

		return await getDownloadURL(imageRef);
	} catch (error) {
		console.error(
			"Erreur lors de la récupération de l'URL de téléchargement :",
			error
		);
		throw error;
	}
}
