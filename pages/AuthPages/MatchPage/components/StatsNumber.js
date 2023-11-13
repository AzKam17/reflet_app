import { StyleSheet, Text, View } from 'react-native';
import { bold, semibold } from '../../../../FontsConfig';

export default function StatsNumber() {
	return (
		<View style={styles.container}>
			<Line />
			<Line />
			<Line />
			<Line />
		</View>
	);
}

const Line = () => {
	return (
		<View style={styles.line}>
			<Text style={styles.text}>20</Text>
			<Text style={styles.lib}>Buts</Text>
			<Text style={styles.text}>20</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 5,
		margin: 20,
		alignItems: 'center',
	},
	line: {
		minWidth: 300,
		maxWidth: 500,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 17,
		textAlign: 'center',
		fontFamily: semibold,
	},
	lib: {
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
		fontFamily: bold,
	},
});
