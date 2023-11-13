import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import tempData from '../../../../assets/TempData';
import { useEffect, useState } from 'react';
import { bold, regular } from '../../../../FontsConfig';
import { GetCountryByIsoCode } from '../../../../fixtures/CountryRepository';
import { refactorIcon } from '../../../../custom_functions/refactorIcon';

export default function ClassementList() {
	const { poules } = tempData;
	const [poulesState, setPoules] = useState(null);
	useEffect(() => {
		setPoules(poules);
		console.log(
			'[ClassementList] - Chargement des données des poules effectué'
		);
	}, []);

	if (!poulesState) {
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
			<View style={{ flex: 1, paddingTop: 10, gap: 10 }}>
				{Object.entries(poulesState).map(([key, value], idx) => (
					<ClassementListItem key={idx} poule={key} data={value} />
				))}
			</View>
		</ScrollView>
	);
}

const ClassementListItem = ({ poule, data }) => {
	return (
		<View style={{ gap: 10 }}>
			<Text
				style={{
					color: 'white',
					fontSize: 18,
					fontFamily: bold,
				}}
			>
				{poule}
			</Text>
			<View
				style={{
					gap: 10,
					backgroundColor: '#113427',
					paddingTop: 10,
					paddingBottom: 10,
					borderRadius: 10,
					padding: 20,
				}}
			>
				<View style={{ flexDirection: 'row' }}>
					<View style={{ flex: 1 }}>
						<Text style={styles.headers}>Équipe</Text>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={styles.headers}>MJ</Text>
						<Text style={styles.headers}>G</Text>
						<Text style={styles.headers}>N</Text>
						<Text style={styles.headers}>P</Text>
						<Text style={[styles.headers, styles.active]}>Pts</Text>
					</View>
				</View>
				{data.map((el, idx) => {
					const country = GetCountryByIsoCode(el?.team);
					return (
						<View key={idx} style={{ flexDirection: 'row' }}>
							<View
								style={{
									flex: 1,
									gap: 10,
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								{refactorIcon(country?.icon, 20)}
								<Text
									style={[
										styles.headers,
										{
											fontFamily: regular,
										},
									]}
								>
									{country?.lib}
								</Text>
							</View>
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Text style={styles.headers}>{el?.mj}</Text>
								<Text style={styles.headers}>{el?.g}</Text>
								<Text style={styles.headers}>{el?.n}</Text>
								<Text style={styles.headers}>{el?.p}</Text>
								<Text style={[styles.headers, styles.active]}>{el?.pts}</Text>
							</View>
						</View>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	headers: {
		color: 'white',
		fontFamily: bold,
	},
	active: {
		color: '#48C543',
	},
});
