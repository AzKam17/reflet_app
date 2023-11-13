import { Text, StyleSheet, View, Pressable } from 'react-native';
import { bold } from '../../../../../FontsConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function GameListItemQuiz({
	id = null,
	isFeatured = false,
	lib = 'Titre du Quiz',
	questionCount = 10,
	pointsToWin = 100,
	partyCount = 200,
	isAvailable = false,
}) {
	const navigation = useNavigation();

	// Ajoutez un style pour le filtre gris lorsque le quiz n'est pas disponible.
	const containerStyle = isAvailable
		? styles.container
		: [styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.1)' }];

	const navigateToQuizPage = () => {
		// Vérifiez si le quiz est disponible avant de naviguer.
		if (isAvailable) {
			navigation.navigate('QuizPage', {
				id: id,
				lib: lib,
				questionCount: questionCount,
			});
		}
	};

	return (
		<Pressable
			onPress={navigateToQuizPage}
			style={[
				containerStyle,
				{
					borderColor: isFeatured ? '#48C543' : 'rgba(0,0,0,0.5)',
				},
			]}
		>
			<View
				style={{ flex: 1, flexDirection: 'row', gap: 10, alignItems: 'center' }}
			>
				<View style={styles.img} />
				<View style={styles.infoBox}>
					<Text style={styles.quizTitle}>{lib}</Text>
					<View style={styles.dataBox}>
						<AntDesign name={'question'} />
						<Text style={styles.dataVal}>{questionCount} Questions</Text>
					</View>
					<View style={styles.dataBox}>
						<Text style={styles.dataVal}>{pointsToWin} 🏆 à gagner</Text>
					</View>
				</View>
			</View>
			<View style={styles.stats}>
				<Text style={styles.statsText}>{partyCount} parties jouées</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 10,
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	img: {
		height: 50,
		width: 50,
		backgroundColor: 'black',
		borderRadius: 100,
	},
	quizTitle: {
		fontSize: 16,
		color: '#48C543',
		fontFamily: bold,
	},
	dataBox: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 3,
	},
	dataVal: {
		fontSize: 12,
		color: 'rgba(0,0,0,0.5)',
	},
	stats: {
		alignItems: 'flex-end',
	},
	statsText: {
		textAlign: 'right',
		fontSize: 12,
		color: 'rgba(0,0,0,0.5)',
	},
});
