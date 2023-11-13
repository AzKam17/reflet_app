import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { GetCountries } from '../../../../fixtures/CountryRepository';
import { semibold } from '../../../../FontsConfig';
import { refactorIcon } from '../../../../custom_functions/refactorIcon';

export default function CountryChatList() {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		GetCountries().then((r) => setCountries(r));
	}, []);

	return (
		<ScrollView horizontal={true}>
			{countries.map((el, idx) => (
				<CountryChatListItem key={idx} {...el} />
			))}
		</ScrollView>
	);
}

const CountryChatListItem = ({ icon = <></>, people = '' }) => {
	return (
		<View style={styles.box}>
			<Text style={styles.textColor}>C'Zo chez les {people}</Text>
			{refactorIcon(icon, 30, 20)}
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		backgroundColor: 'white',
		padding: 20,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
	},
	textColor: {
		color: 'black',
		fontFamily: semibold,
	},
});
