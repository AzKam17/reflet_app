import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { bold, regular, semibold } from '../../../../../FontsConfig';
import { useCountry } from '../../../../../provider/CountryProvider';
import { updateUserDocumentWithPrediction } from '../../../../../firebase_functions/predictions/updateUserDocumentWithPrediction';
import { useAuth } from '../../../../../provider/AuthProvider';

export default function PredictionItem({ awayTeam, homeTeam, day, hour, id }) {
	const { getUser } = useAuth();
	const { getCountries } = useCountry();
	const [isExtended, setIsExtended] = useState(false);
	const [userPrediction, setUserPrediction] = useState(null);

	function getObjectByIsoCode(isoCode) {
		const result = getCountries().filter((item) => item.iso_code === isoCode);
		return result.length > 0 ? result[0] : null;
	}

	// Fonction pour basculer entre les états étendu et réduit
	const toggleExtended = () => {
		setIsExtended(!isExtended);
	};

	// Fonction pour envoyer la prédiction au serveur
	const sendPrediction = (prediction) => {
		console.log(getUser()?.uid);
		// Utilisez la fonction updateUserDocumentWithPrediction pour envoyer la prédiction au serveur
		updateUserDocumentWithPrediction(getUser()?.uid, id, prediction)
			.then(() => {
				console.log('Prédiction envoyée avec succès');
				setUserPrediction({
					choice: prediction,
					prediction_id: id,
				});
			})
			.catch((error) => {
				console.error("Erreur lors de l'envoi de la prédiction :", error);
			});
	};

	useEffect(() => {
		const userPredictions = getUser()?.predictions;
		const fetchedUserPrediction = userPredictions.find(
			(prediction) => prediction.prediction_id === id
		);
		if (fetchedUserPrediction) {
			console.log(fetchedUserPrediction);
			setUserPrediction(fetchedUserPrediction);
		}
	}, []);

	return (
		<Pressable style={styles.container} onPress={toggleExtended}>
			<View style={styles.previewContainer}>
				<View style={styles.countryInfoContainer}>
					<CountryFlag isoCode={awayTeam} size={25} />
					<Text style={styles.paysLib}>{getObjectByIsoCode(awayTeam).lib}</Text>
				</View>
				<Text style={styles.hour}>{hour}</Text>
				<View style={styles.countryInfoContainer}>
					<CountryFlag isoCode={homeTeam} size={25} />
					<Text style={styles.paysLib}>{getObjectByIsoCode(homeTeam).lib}</Text>
				</View>
			</View>

			{userPrediction && (
				<Text
					style={{
						textAlign: 'center',
						color: 'white',
					}}
				>
					Vous avez prédit{', '}
					{userPrediction?.choice === 'draw' && 'un match nul'}
					{userPrediction?.choice !== 'draw' &&
						'victoire ' + getObjectByIsoCode(userPrediction?.choice).lib}
					.
				</Text>
			)}

			{isExtended && !userPrediction && (
				<View style={styles.allChoicesContainer}>
					<Pressable
						style={styles.choicesContainer}
						onPress={() => sendPrediction(awayTeam)}
					>
						<Text style={styles.choicesLib}>
							{getObjectByIsoCode(awayTeam).lib}
						</Text>
					</Pressable>
					<Pressable
						style={styles.choicesContainer}
						onPress={() => sendPrediction('draw')}
					>
						<Text style={styles.choicesLib}>Match nul</Text>
					</Pressable>
					<Pressable
						style={styles.choicesContainer}
						onPress={() => sendPrediction(homeTeam)}
					>
						<Text style={styles.choicesLib}>
							{getObjectByIsoCode(homeTeam).lib}
						</Text>
					</Pressable>
				</View>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#164433',
	},
	previewContainer: {
		gap: 10,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	paysLib: {
		color: 'white',
		fontFamily: regular,
	},
	countryInfoContainer: {
		alignItems: 'center',
	},
	hour: {
		color: 'white',
		fontFamily: bold,
		fontSize: 20,
	},
	allChoicesContainer: {
		gap: 5,
		marginTop: 10,
	},
	choicesContainer: {
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#48C543',
		borderRadius: 5,
	},
	choicesLib: {
		color: 'white',
		fontFamily: semibold,
	},
});
