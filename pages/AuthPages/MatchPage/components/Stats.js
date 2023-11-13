import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StatsNumber from './StatsNumber';
import { bold } from '../../../../FontsConfig';
import StatsEvents from './StatsEvents';

export default function Stats({ route }) {
	return (
		<ScrollView style={styles.container}>
			{Object.keys(data.stats).length > 0 && (
				<View>
					<Text style={styles.text}>Détais du match</Text>
					<View style={styles.separator} />
					<StatsNumber />
				</View>
			)}
			{Object.keys(data.events).length > 0 && (
				<View>
					<Text style={styles.text}>Historique</Text>
					<View style={styles.separator} />
					<StatsEvents data={data} />
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#184D39',
		padding: 20,
	},
	text: {
		color: 'white',
		fontSize: 20,
		fontFamily: bold,
	},
	separator: {
		height: 2,
		backgroundColor: 'rgba(255,255,255,0.2)',
	},
});
