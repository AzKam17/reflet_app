import { Pressable, StyleSheet, Text, View } from 'react-native';
import { semibold } from '../../../../../FontsConfig';

export default function ConfirmButton({
	validAnswer = () => {},
	nextQuestion = () => {},
	isValidActive = false,
	isNextActive = false,
}) {
	return (
		<View style={styles.container}>
			<Pressable
				style={[
					styles.btn,
					{
						borderColor: isValidActive ? '#48C543' : '#D4D4D4',
					},
				]}
				onPress={validAnswer}
			>
				<Text
					style={[
						styles.text,
						{
							color: isValidActive ? '#48C543' : '#D4D4D4',
						},
					]}
				>
					Valider
				</Text>
			</Pressable>
			<Pressable
				style={[
					styles.btn,
					{
						borderColor: isNextActive ? '#48C543' : '#D4D4D4',
					},
				]}
				onPress={nextQuestion}
			>
				<Text
					style={[
						styles.text,
						{
							color: isNextActive ? '#48C543' : '#D4D4D4',
						},
					]}
				>
					Suivant
				</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
	},
	btn: {
		flex: 1,
		paddingTop: 20,
		paddingBottom: 20,
		borderColor: '#D4D4D4',
		borderWidth: 2,
		alignItems: 'center',
	},
	text: {
		color: '#D4D4D4',
		fontSize: 15,
		fontFamily: semibold,
	},
});
