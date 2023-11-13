import SafeView from '../../SafeView';
import { StyleSheet, View } from 'react-native';
import Title from './components/Title';
import QuestionsCard from './components/QuestionsCard';
import Question from './components/Question';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../provider/AuthProvider';
import { addQuizToUser } from '../../../../firebase_functions/quiz/addQuizToUser';
import { incrementPartyCount } from '../../../../firebase_functions/quiz/incrementPartyCount';

export default function QuizPage({ route }) {
	const { getUser } = useAuth();
	const [quizData, setQuizData] = useState(route.params);

	useEffect(() => {
		addQuizToUser(getUser()?.uid, quizData?.id).then((r) => {
			console.log('[QuizPage] - Quiz ajouté au doc utilisateur');
			incrementPartyCount(quizData?.id).then((r) =>
				console.log('[QuizPage] - Compteur de parties incrémenté')
			);
		});
	}, []);

	return (
		<SafeView style={styles.container}>
			<Title title={quizData?.lib} />
			<QuestionsCard
				id={quizData?.id}
				questionCount={quizData?.questionCount}
			/>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, gap: 10, paddingBottom: 0 },
});
