import { StyleSheet, Text } from 'react-native';
import { semibold } from '../../../../../FontsConfig';

export default function QuestionTitle({ ask = 'question' }) {
	return <Text style={styles.text}>{ask}</Text>;
}

const styles = StyleSheet.create({
	text: {
		fontSize: 19,
		fontFamily: semibold,
	},
});
