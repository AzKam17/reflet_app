import { StyleSheet, View } from 'react-native';
import QuestionOption from './QuestionOption';

export default function QuestionOptionList({
	choice,
	options,
	setChoice = () => {},
}) {
	return (
		<View style={styles.container}>
			{options.map((el, index) => {
				return (
					<QuestionOption
						key={index}
						id={index + 1}
						value={el?.correct}
						text={el?.lib}
						choice={choice}
						setChoice={setChoice}
					/>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
});
