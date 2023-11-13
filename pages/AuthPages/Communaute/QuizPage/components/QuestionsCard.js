import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import QuestionNumberItemList from './QuestionNumberItemList';
import Question from './Question';
import { useEffect, useState } from 'react';
import { getQuestionsForQuiz } from '../../../../../firebase_functions/quiz/getQuestionsForQuiz';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native'; // Importez le hook useFocusEffect

export default function QuestionsCard({ id, questionCount }) {
	const navigation = useNavigation();
	const [actualQuestionIdx, setActualQuestionIdx] = useState(1);
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Utilisez useFocusEffect pour recharger les données à chaque fois que le composant reprend le focus
	useFocusEffect(
		React.useCallback(() => {
			setIsLoading(true); // Démarrez le chargement à chaque focus.

			getQuestionsForQuiz(id)
				.then((questions) => {
					setQuestions(questions);
					setIsLoading(false); // Mettez fin au chargement après avoir reçu les données.
				})
				.catch((error) => {
					console.error(
						'[QuestionsCard] - Erreur lors de la récupération des questions :',
						error
					);
					setIsLoading(false); // Mettez fin au chargement en cas d'erreur.
				});
		}, [id])
	);

	const nextQuestion = () => {
		if (actualQuestionIdx < questionCount) {
			setActualQuestionIdx(actualQuestionIdx + 1);
		} else {
			navigation.navigate('GamePage');
		}
	};

	return (
		<View style={styles.container}>
			<QuestionNumberItemList
				questionCount={questionCount}
				actualQuestionIdx={actualQuestionIdx}
			/>
			<View style={styles.separator} />
			{isLoading ? (
				<ActivityIndicator size="large" color="#D4D4D4" />
			) : (
				<Question
					nextQuestion={nextQuestion}
					question={questions[actualQuestionIdx - 1]}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
	},
	separator: {
		height: 2,
		backgroundColor: 'rgba(0,0,0,0.2)',
	},
});
