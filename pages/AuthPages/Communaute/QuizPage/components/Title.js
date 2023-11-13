import { StyleSheet, Text } from 'react-native';
import { bold } from '../../../../../FontsConfig';

export default function Title({ title = 'Titre du Quiz' }) {
	return <Text style={styles.text}>{title}</Text>;
}

const styles = StyleSheet.create({
	text: {
		color: 'white',
		fontFamily: bold,
		marginLeft: 20,
		fontSize: 30,
	},
});
