import { Text, StyleSheet, View, Pressable } from 'react-native';
import { regular, semibold } from '../../../../../FontsConfig';

export default function QuestionOption({
	id = 0,
	choice,
	value = false,
	text = 'default_text',
	setChoice = () => {},
}) {
	const mapNumberToLetter = (number) => String.fromCharCode(64 + number);

	return (
		<Pressable onPress={() => setChoice(value)} style={styles.container}>
			<View
				style={[
					styles.bubble,
					{
						backgroundColor: choice === value ? '#48C543' : '#D4D4D4',
					},
				]}
			>
				<Text style={styles.bubbleText}>{mapNumberToLetter(id)}</Text>
			</View>
			<Text style={styles.response}>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	bubbleText: {
		margin: 10,
		color: 'white',
		paddingRight: 3,
		paddingLeft: 3,
	},
	bubble: {
		//padding: 10,
		borderRadius: 100,
		backgroundColor: '#D4D4D4',
	},
	response: {
		fontSize: 15,
		fontFamily: regular,
	},
});
