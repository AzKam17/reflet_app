import { StyleSheet, Text } from 'react-native';
import { semibold } from '../../../FontsConfig';

export default function ModalTitle({ text = 'modal_title_text' }) {
	return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
	text: {
		color: '#184D39',
		fontFamily: semibold,
		fontSize: 30,
	},
});
