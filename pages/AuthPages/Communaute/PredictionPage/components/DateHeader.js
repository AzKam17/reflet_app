import { Text, StyleSheet, View } from 'react-native';
import { semibold } from '../../../../../FontsConfig';

export default function DateHeader() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Vendredi 27 Octobre 2024</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginRight: 20,
		marginLeft: 20,
		borderBottomColor: '#46FF6F',
		borderBottomWidth: 1,
		alignItems: 'center',
	},
	text: {
		color: '#46FF6F',
		fontFamily: semibold,
	},
});
