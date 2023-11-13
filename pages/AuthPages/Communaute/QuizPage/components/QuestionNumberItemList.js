import { StyleSheet, View } from 'react-native';
import QuestionNumberItem from './QuestionNumberItem';

export default function QuestionNumberItemList({
	questionCount,
	actualQuestionIdx,
}) {
	return (
		<View style={styles.container}>
			{Array.from({ length: questionCount }, (_, i) => i + 1).map((el, idx) => {
				return (
					<QuestionNumberItem
						key={idx}
						value={el}
						isActive={el <= actualQuestionIdx}
					/>
				);
			})}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
