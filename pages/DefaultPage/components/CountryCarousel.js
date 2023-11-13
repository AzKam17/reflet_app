import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { ConnectivityContext } from '../../../provider/ConnectivityProvider';
import { CountryContext } from '../../../provider/CountryProvider';
import Carousel from 'react-native-reanimated-carousel';
import CountryFlag from 'react-native-country-flag';
import { GetCountries } from '../../../fixtures/CountryRepository';
import { refactorIcon } from '../../../custom_functions/refactorIcon';

export default function CountryCarousel() {
	const iconSize = 40;
	const width = Dimensions.get('window').width + 15;
	// Context des pays
	const { getCountries } = useContext(CountryContext);
	// Store du carousel des pays
	const [countriesForCarousel, setCountriesForCarousel] = useState(null);

	// Récupération de la liste des pays
	useEffect(() => {
		GetCountries().then((res) => setCountriesForCarousel(res));
	}, []);

	// Fonction de logging
	useEffect(() => {
		if (countriesForCarousel) {
			console.log('[CountryCarousel] - Chargement des pays réussis');
		}
	}, [countriesForCarousel]);

	if (!countriesForCarousel) {
		return <></>;
	}

	return (
		<View style={styles.container}>
			<Carousel
				loop
				vertical={false}
				autoPlay={true}
				width={width / 9}
				height={iconSize}
				autoPlayInterval={1000}
				data={countriesForCarousel}
				renderItem={({ item }) => {
					return refactorIcon(item.icon, iconSize);
				}}
				itemWidth={iconSize * 0.8}
				itemHeight={iconSize + 10}
				style={{
					width: width * 0.9,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 10,
	},
});
