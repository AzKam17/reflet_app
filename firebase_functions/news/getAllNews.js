import {
	collection,
	doc,
	getDoc,
	getDocs,
	increment,
	updateDoc,
} from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig'; // Assurez-vous d'importer correctement votre configuration Firebase

export const getAllNews = async () => {
	const newsRef = collection(FIRESTORE, 't_news');

	try {
		const querySnapshot = await getDocs(newsRef);
		const news = [];

		querySnapshot.forEach((doc) => {
			news.push({ id: doc.id, ...doc.data() });
		});

		return news;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des documents de la collection "t_news" :',
			error
		);
		return null;
	}
};

export const getNewsById = async (newsId) => {
	const newsDocRef = doc(FIRESTORE, 't_news', newsId);

	try {
		const docSnapshot = await getDoc(newsDocRef);

		if (docSnapshot.exists()) {
			await updateDoc(newsDocRef, { view: increment(1) });

			return { id: docSnapshot.id, ...docSnapshot.data() };
		} else {
			return null;
		}
	} catch (error) {
		console.error(
			'Erreur lors de la récupération de la nouvelle (news) par ID :',
			error
		);
		return null;
	}
};
