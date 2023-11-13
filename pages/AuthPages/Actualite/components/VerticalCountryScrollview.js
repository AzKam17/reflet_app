import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { GetCountries } from '../../../../fixtures/CountryRepository';
import { semibold } from '../../../../FontsConfig';

export default function VerticalCountryScrollview({ onPress = () => {} }) {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);

	useEffect(() => {
		GetCountries().then((res) => {
			setCountries(res);
		});
	}, []);

	useEffect(() => {
		onPress(selectedCountry);
	}, [selectedCountry]);

	const styleIcon = (icon) => {
		return React.cloneElement(icon, {
			width: 30,
			height: 30,
			style: [
				{
					shadowColor: 'rgba(0, 0, 0, 0.25)',
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 1,
					shadowRadius: 4,
				},
			],
		});
	};

	return (
		<ScrollView
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			style={{ gap: 10, padding: 5, maxHeight: 60 }}
		>
			<View style={{ width: 10 }} />
			<Pressable
				key={0}
				onPress={() => {
					setSelectedCountry('all');
				}}
				style={{
					marginRight: 5,
					paddingLeft: 10,
					paddingRight: 10,
					paddingBottom: 15,
					paddingTop: 10,
					backgroundColor: 'all' === selectedCountry ? '#F17228' : '#113427',
					borderRadius: 20,
					justifyContent: 'center',
				}}
			>
				<Text style={{ color: 'white', fontFamily: semibold }}>
					⚽ CAN 2024
				</Text>
			</Pressable>
			{countries.map((el, idx) => {
				return (
					<Pressable
						key={idx + 1}
						onPress={() => {
							setSelectedCountry(el?.slug);
						}}
						style={{
							marginRight: 5,
							paddingLeft: 10,
							paddingRight: 10,
							paddingBottom: 15,
							paddingTop: 10,
							backgroundColor:
								el?.slug === selectedCountry ? '#F17228' : '#113427',
							borderRadius: 20,
						}}
					>
						{styleIcon(el?.icon)}
					</Pressable>
				);
			})}
			<View style={{ width: 10 }} />
		</ScrollView>
	);
}
