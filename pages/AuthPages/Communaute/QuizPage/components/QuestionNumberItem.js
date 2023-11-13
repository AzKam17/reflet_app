import { Text, StyleSheet, View } from 'react-native';

export default function QuestionNumberItem({ value = 0, isActive = false }) {
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: isActive ? '#48C543' : '#D4D4D4',
				},
			]}
		>
			<Text style={styles.text}>{value}</Text>
		</View>
	);
}
// 48C543
const styles = StyleSheet.create({
	container: {
		padding: 5,
		margin: 3,
		borderRadius: 300,
	},
	text: {
		color: 'white',
		fontSize: 18,
		margin: 5,
		paddingLeft: 3,
		paddingRight: 3,
	},
});
