import SafeView from '../../SafeView';
import { Text, StyleSheet, View } from 'react-native';
import PageHeader from '../components/PageHeader';
import { bold } from '../../../../FontsConfig';
import DateHeader from './components/DateHeader';
import PredictionItem from './components/PredictionItem';
import { useEffect, useState } from 'react';
import { getPredictionsGroupedByDay } from '../../../../firebase_functions/predictions/getPredictionsGroupedByDay';

export default function PredictionPage() {
	const [matchPredictions, setMatchPredictions] = useState({});

	function formatDateFromString(dateString) {
		const daysOfWeek = [
			'Dimanche',
			'Lundi',
			'Mardi',
			'Mercredi',
			'Jeudi',
			'Vendredi',
			'Samedi',
		];

		const months = [
			'Janvier',
			'Février',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juillet',
			'Août',
			'Septembre',
			'Octobre',
			'Novembre',
			'Décembre',
		];

		const dateParts = dateString.split('/');
		if (dateParts.length !== 3) {
			return 'Date invalide';
		}

		const day = parseInt(dateParts[0], 10);
		const month = parseInt(dateParts[1], 10) - 1; // Mois commence à 0 pour janvier
		const year = 2000 + parseInt(dateParts[2], 10); // Supposons que les années sont dans les années 2000

		const date = new Date(year, month, day);
		const dayOfWeek = daysOfWeek[date.getDay()];
		const monthName = months[month];

		return `${dayOfWeek} ${day} ${monthName} ${year}`;
	}

	useEffect(() => {
		getPredictionsGroupedByDay()
			.then((groupedPredictions) => {
				setMatchPredictions(groupedPredictions);
			})
			.catch((error) => {
				console.error(
					'Erreur lors de la récupération des prédictions :',
					error
				);
			});
	}, []);

	return (
		<SafeView style={styles.container}>
			<PageHeader text={'Prédictions'} displayBackButton={true} />
			<Text style={styles.description}>
				Prédisez les scores des matchs à venir et gagner des points !
			</Text>
			<DateHeader />
			{/* Parcourir les prédictions groupées par jour et afficher les composants PredictionItem */}
			{Object.keys(matchPredictions).map((day) => (
				<View key={day}>
					<Text style={styles.date}>{formatDateFromString(day)}</Text>
					{matchPredictions[day].map((prediction) => (
						<PredictionItem
							key={prediction.id}
							awayTeam={prediction.awayTeam}
							homeTeam={prediction.homeTeam}
							day={formatDateFromString(day)}
							hour={prediction.hour}
							id={prediction.id}
						/>
					))}
				</View>
			))}
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
		padding: 20,
	},
	description: {
		color: 'white',
		fontFamily: bold,
		fontSize: 18,
	},
	date: {
		color: 'white',
		fontFamily: bold,
		fontSize: 20,
		marginTop: 10,
	},
});
