import { Text, StyleSheet, View, ScrollView } from 'react-native';
import SafeView from '../SafeView';
import { useEffect, useState } from 'react';
import { bold } from '../../../FontsConfig';
import { useCountry } from '../../../provider/CountryProvider';
import PaysItem from './components/PaysItem';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { useAuth } from '../../../provider/AuthProvider';
import { setPreferredCountry } from '../../../firebase_functions/user/setPreferredCountry';
import { isPreferredCountrySet } from '../../../firebase_functions/user/isPreferredCountrySet';
import { GetCountries } from '../../../fixtures/CountryRepository';

export default function TeamSelection({ navigation }) {
	const { getUser } = useAuth();
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('ci');

	// Vérification si existance pays préféré si oui, redirection vers la page d'accueil
	useEffect(() => {
		const userPrefCountry = getUser()?.prefered_country;
		if (userPrefCountry) {
			console.log('TeamSelection - Pays préféré existant');
			console.log("TeamSelection - Redirection vers la page d'accueil");
			navigation.navigate('HomePageNavigator');
		}
	}, []);

	// Récupération de la liste des pays pour la sélection
	useEffect(() => {
		GetCountries().then((res) => {
			setCountries(res);
		});
	}, []);

	const updatePreferredCountry = () => {
		const userUid = getUser()?.uid;
		setPreferredCountry(userUid, selectedCountry).then((r) => {
			console.log('TeamSelection - Pays préféré mis à jour');
			console.log("TeamSelection - Redirection vers la page d'accueil");
			navigation.navigate('HomePageNavigator');
		});
	};

	const chunkArray = (array, size) => {
		const chunks = [];
		for (let i = 0; i < array.length; i += size) {
			chunks.push(array.slice(i, i + size));
		}
		return chunks;
	};

	return (
		<SafeView style={styles.container}>
			<Text style={styles.text}>Votre équipe{'\n'}préférée ?</Text>
			<Text
				style={[
					styles.text,
					{
						fontSize: 15,
						paddingTop: 5,
						paddingBottom: 5,
					},
				]}
			>
				Lorsque vous choisissez votre équipe, vous serez automatiquement
				redirigé vers un groupe correspondant à votre choix.
			</Text>
			<View style={{ flex: 1 }}>
				<ScrollView>
					{chunkArray(countries, 3).map((chunk, index) => (
						<View key={index}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-evenly',
									alignItems: 'center',
								}}
							>
								{chunk.map((flag, idx) => (
									<PaysItem
										key={idx}
										onPress={() => setSelectedCountry(flag?.slug)}
										lib={flag?.lib}
										icon={flag?.icon}
										is_active={flag?.slug === selectedCountry}
									/>
								))}
							</View>
							<View style={{ height: 10 }} />
						</View>
					))}
				</ScrollView>
			</View>
			<PrimaryButton
				text={'Continuer'}
				onPress={updatePreferredCountry}
				style={{
					width: '100%',
				}}
			/>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	text: {
		color: 'white',
		fontFamily: bold,
		fontSize: 40,
	},
});
