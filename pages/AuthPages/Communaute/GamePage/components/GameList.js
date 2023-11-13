import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import GameListItemQuiz from './GameListItemQuiz';
import { useEffect, useState } from 'react';
import { getAllAvailableQuizzes } from '../../../../../firebase_functions/quiz/getAllAvailableQuizzes';
import { useAuth } from '../../../../../provider/AuthProvider';

export default function GameList() {
	const { getUser } = useAuth();
	const [availableQuizzes, setAvailableQuizzes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAllAvailableQuizzes()
			.then((quizzes) => {
				setAvailableQuizzes(quizzes);
				setIsLoading(false); // Marquez le chargement comme terminé une fois les données récupérées.
			})
			.catch((error) => {
				console.error(
					'Erreur lors de la récupération des quiz disponibles :',
					error
				);
				setIsLoading(false); // Marquez le chargement comme terminé en cas d'erreur.
			});
	}, []);

	return (
		<ScrollView style={styles.container}>
			{isLoading ? (
				// Affichez l'ActivityIndicator pendant le chargement.
				<ActivityIndicator
					size="large"
					color="#48C543"
					style={{ flex: 1, justifyContent: 'center' }}
				/>
			) : (
				// Une fois le chargement terminé, affichez la liste des quiz.
				availableQuizzes.map((quiz, index) => (
					<GameListItemQuiz
						key={index}
						id={quiz.id}
						lib={quiz.lib}
						isFeatured={quiz.featured}
						isAvailable={!getUser()?.quiz?.includes(quiz.id)}
						questionCount={quiz.questionCount}
						pointsToWin={quiz.pointsToWin}
						partyCount={quiz.partyCount}
					/>
				))
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
		padding: 20,
		paddingTop: 30,
		backgroundColor: 'white',
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
	},
});
