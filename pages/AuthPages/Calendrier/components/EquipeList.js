import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { GetCountries } from '../../../../fixtures/CountryRepository';
import { semibold } from '../../../../FontsConfig';
import { refactorIcon } from '../../../../custom_functions/refactorIcon';
import PaysItem from '../../TeamSelection/components/PaysItem';

export default function EquipeList() {
	const [countries, setCountries] = useState(null);

	useEffect(() => {
		GetCountries().then((res) => setCountries(res));
		console.log('[EquipeList] - Chargement des données des pays effectué');
	}, []);

	const chunkArray = (array, size) => {
		const chunks = [];
		for (let i = 0; i < array.length; i += size) {
			chunks.push(array.slice(i, i + size));
		}
		return chunks;
	};

	if (!countries) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<ScrollView>
			<View style={{ paddingTop: 10 }}>
				{chunkArray(countries, 3).map((chunk, index) => (
					<View
						key={index}
						style={{
							gap: 10,
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-around',
								alignItems: 'center',
							}}
						>
							{chunk.map((flag, idx) => (
								<EquipeListItem key={idx} country={flag} />
							))}
						</View>
						<View style={{ height: 10 }} />
					</View>
				))}
			</View>
		</ScrollView>
	);
}

const EquipeListItem = ({ country }) => {
	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				width: 100,
			}}
		>
			{refactorIcon(country.icon, 60)}
			<Text
				style={{
					color: 'white',
					fontFamily: semibold,
					textAlign: 'center',
				}}
			>
				{country.lib}
			</Text>
		</View>
	);
};
