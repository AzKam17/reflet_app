import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetCountry } from '../../fixtures/CountryRepository';
import { semibold } from '../../FontsConfig';

export default function MatchItem({
	id = null,
	homeTeamId = null,
	awayTeamId = null,
	stade = '',
	date = '',
	hour = '',
}) {
	const data = {
		id: 1,
		homeTeamId: 2,
		awayTeamId: 13,
		stade: 'Ebimpé',
		date: 'Samedi 13 Janvier',
		hour: '21h',
	};
	const [loading, setLoading] = useState(true);
	const [homeTeam, setHomeTeam] = useState({});
	const [awayTeam, setAwayTeam] = useState({});

	useEffect(() => {
		GetCountry(homeTeamId).then((res) => {
			setHomeTeam(res);
			GetCountry(awayTeamId).then((res) => {
				setAwayTeam(res);
				setLoading(false);
			});
		});
	}, []);

	const styleIcon = (country) => {
		return React.cloneElement(country?.icon, {
			width: 60,
			height: 60,
			style: [
				{
					alignSelf: 'center',
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
		<View
			style={{
				flexDirection: 'row',
				marginRight: 10,
				marginLeft: 10,
				padding: 10,
				paddingRight: 20,
				paddingLeft: 20,
				borderRadius: 15,
				backgroundColor: '#30772D',
				justifyContent: 'space-between',
			}}
		>
			{loading && (
				<ActivityIndicator
					style={{
						alignSelf: 'center',
					}}
				/>
			)}
			{!loading && (
				<>
					{styleIcon(homeTeam)}
					<View>
						<Text
							style={[
								styles.text,
								{
									fontSize: 16,
								},
							]}
						>
							{date}
						</Text>
						<Text style={styles.text}>{hour}</Text>
						<Text style={styles.text}>🏟️{stade}</Text>
					</View>
					{styleIcon(awayTeam)}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: 'white',
		fontFamily: semibold,
		textAlign: 'center',
	},
});
