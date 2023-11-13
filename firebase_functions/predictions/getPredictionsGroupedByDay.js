import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { FIRESTORE } from '../../FirebaseConfig';

export async function getPredictionsGroupedByDay() {
	const predictionsCollection = collection(FIRESTORE, 't_predictions_match');
	const querySnapshot = await getDocs(predictionsCollection);

	const groupedPredictions = {};

	querySnapshot.forEach((doc) => {
		const predictionData = doc.data();
		const day = predictionData.day; // Assurez-vous que la propriété s'appelle "day".

		if (!groupedPredictions[day]) {
			groupedPredictions[day] = [];
		}

		groupedPredictions[day].push({ id: doc.id, ...predictionData });
	});

	return groupedPredictions;
}
