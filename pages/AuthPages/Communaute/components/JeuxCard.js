import { Text, StyleSheet, View, Pressable } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { bold, regular, semibold } from '../../../../FontsConfig';
import { useNavigation } from '@react-navigation/native';

export default function JeuxCard() {
	const navigation = useNavigation();
	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				navigation.navigate('GamePage');
			}}
		>
			<CountryFlag isoCode={'ml'} size={30} />
			<View style={styles.infosContainer}>
				<Text style={styles.title}>Quiz</Text>
				<Text style={styles.question}>
					Quelle nation a remporté la CAN en 2019 ?
				</Text>
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
		fontFamily: bold,
	},
	question: {
		fontFamily: regular,
	},
});
