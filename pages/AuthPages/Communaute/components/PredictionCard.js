import { Text, StyleSheet, View, Pressable } from 'react-native';
import { bold, semibold } from '../../../../FontsConfig';
import CountryFlag from 'react-native-country-flag';
import { useNavigation } from '@react-navigation/native';

export default function PredictionCard() {
	const navigation = useNavigation();
	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				navigation.navigate('PredictionPage');
			}}
		>
			<Text style={styles.title}>PRÉDICTION</Text>
			<View style={styles.matchBox}>
				<View style={styles.teamFlag}>
					<CountryFlag isoCode={'ci'} size={30} />
				</View>
				<View style={styles.details}>
					<Text style={styles.hour}>
						Mercredi 07 Jan {'\n'}
						14H
					</Text>
					<Text style={styles.vsLib}>VS</Text>
				</View>
				<View style={styles.teamFlag}>
					<CountryFlag isoCode={'ci'} size={30} />
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 5,
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	title: {
		color: 'black',
		fontFamily: bold,
		fontSize: 15,
		letterSpacing: 2,
	},
	matchBox: {
		//maxWidth: 300,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	teamFlag: {},
	details: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	hour: {
		fontSize: 10,
		fontFamily: semibold,
		textAlign: 'center',
	},
	vsLib: {
		fontFamily: bold,
		fontSize: 18,
	},
});
