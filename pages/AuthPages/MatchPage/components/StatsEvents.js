import { StyleSheet, Text, View } from 'react-native';
import { semibold } from '../../../../FontsConfig';
import CountryFlag from 'react-native-country-flag';

export default function StatsEvents({ data }) {
	return (
		<View style={styles.container}>
			{data.events.map((el, index) => {
				return (
					<EventLine
						key={index}
						data={el}
						h={data?.home_name}
						a={data?.away_name}
					/>
				);
			})}
		</View>
	);
}

const EventLine = ({ data, h, a }) => {
	function formaterEvenement(evenement, equipeDomicile, equipeAdverse) {
		const { event, home_away, player, time, info } = evenement;

		let evenementFormate = '';

		// Déterminez si c'est un événement à domicile ou à l'extérieur
		const lieu = home_away === 'h' ? equipeDomicile : equipeAdverse;

		// Formate l'heure
		const heureFormatee = `à la ${time}' minute`;

		switch (event) {
			case 'GOAL':
				evenementFormate = `⚽ ${heureFormatee} - ${player}`;
				break;
			case 'SUBSTITUTION':
				evenementFormate = `🔄 ${heureFormatee} - ${player} remplace ${info}`;
				break;
			case 'YELLOW_CARD':
				evenementFormate = `🟡 ${heureFormatee} - ${player}`;
				break;
			case 'RED_CARD':
				evenementFormate = `🔴 ${heureFormatee} - ${player}`;
				break;
			// Vous pouvez ajouter d'autres cas selon vos besoins
			default:
				evenementFormate = 'Événement inconnu';
				break;
		}

		return evenementFormate;
	}

	return (
		<View style={styles.lineContainer}>
			<Text style={styles.text}>{formaterEvenement(data, h, a)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		//paddingLeft: 20,
	},
	text: {
		color: 'white',
		fontFamily: semibold,
		fontSize: 15,
	},
	lineContainer: {
		flexDirection: 'row',
		//justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		gap: 10,
	},
});
