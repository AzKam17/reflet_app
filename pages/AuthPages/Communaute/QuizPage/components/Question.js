import { StyleSheet, View, Text } from 'react-native';
import QuestionTitle from './QuestionTitle';
import QuestionOptionList from './QuestionOptionList';
import ConfirmButton from './ConfirmButton';
import { useEffect, useState } from 'react';
import { selectUserAndAddPoints } from '../../../../../firebase_functions/quiz/selectUserAndAddPoints';
import { useAuth } from '../../../../../provider/AuthProvider';

export default function Question({ question, nextQuestion = () => {} }) {
	const { getUser } = useAuth();
	const [choice, setChoice] = useState(null);
	const [isValidActive, setIsValidActive] = useState(false);
	const [isNextActive, setIsNextActive] = useState(false);
	const [feedback, setFeedback] = useState(null); // État pour stocker le feedback

	useEffect(() => {
		setIsValidActive(false);
		if (choice !== null) {
			setIsValidActive(true);
		}
	}, [choice]);

	const validAnswer = () => {
		let feedbackMessage = null;

		if (choice === true) {
			// Réponse correcte
			selectUserAndAddPoints(getUser()?.uid, question?.points);
			feedbackMessage = 'Félicitations, la réponse est correcte !';
		} else {
			// Réponse incorrecte
			feedbackMessage = 'Désolé, la réponse est incorrecte.';
		}

		setFeedback(feedbackMessage);
		setIsNextActive(true);
	};

	const goToNextQuestion = () => {
		if (isNextActive) {
			setChoice(null);
			setIsNextActive(false);
			setFeedback(null);
			nextQuestion();
		}
	};

	const confirmAnswer = () => {
		if (isValidActive) {
			validAnswer();
		}
	};

	return (
		<View style={styles.container}>
			<QuestionTitle ask={question?.question} />
			<QuestionOptionList
				choice={choice}
				options={question?.options}
				setChoice={setChoice}
			/>
			<Text style={styles.feedbackText}>{feedback}</Text>
			<ConfirmButton
				validAnswer={confirmAnswer}
				nextQuestion={goToNextQuestion}
				isValidActive={isValidActive}
				isNextActive={isNextActive}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
	feedbackText: {
		textAlign: 'center',
		color: 'green', // Couleur du texte pour une réponse correcte
		fontWeight: 'bold',
		marginTop: 10,
	},
});
