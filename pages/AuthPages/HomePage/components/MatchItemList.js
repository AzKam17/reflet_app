import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native'; // Ajout de ActivityIndicator
import MatchItem from './MatchItem';
import { useEffect, useState } from 'react';
import { getMatchsByTabsId } from '../../../../firebase_functions/matchs/getMatchsByTabsId';
import { useCountry } from '../../../../provider/CountryProvider';

export default function MatchItemList({ actualDay }) {
	const numberOfItems = 10;
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement
	const { getISOCodeFromName } = useCountry();

	useEffect(() => {
		getMatchsByTabsId(actualDay).then((res) => {
			setItems(res);
			setIsLoading(false); // Mettre isLoading à false une fois que les données sont chargées
		});
	}, [actualDay]);

	if (isLoading) {
		// Affiche l'indicateur de chargement tant que les données sont en cours de chargement
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#fffff" />
			</View>
		);
	}

	if (items.length === 0 || actualDay === null) {
		return <View></View>;
	}

	return (
		<ScrollView>
			{items.map((el, index) => {
				return (
					<View key={index}>
						<MatchItem
							id={el?.id}
							away_id={el?.away_id}
							home_id={el?.home_id}
							home={el?.home_name}
							away={el?.away_name}
							ft_score={el?.ft_score}
						/>
						{index !== numberOfItems - 1 && <View style={styles.separator} />}
					</View>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	separator: {
		height: 2,
		backgroundColor: 'rgba(255,255,255,0.1)',
	},
	loadingContainer: {
		flex: 1,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
