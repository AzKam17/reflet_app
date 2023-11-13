import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import SafeView from '../SafeView';
import PageHeader from '../Communaute/components/PageHeader';
import CountryFlag from 'react-native-country-flag';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { bold, regular, semibold } from '../../../FontsConfig';
import LineUp from './components/LineUp';
import Stats from './components/Stats';
import Videos from './components/Videos';
import RadioPlayer from './components/RadioPlayer';
import { useEffect, useState } from 'react';
import { getMatchByProperty } from '../../../firebase_functions/matchs/getMatchByProperty';
import { Image } from 'expo-image';

const Tab = createMaterialTopTabNavigator();

function DetailsTabs({ data }) {
	if (!data) {
		return <ActivityIndicator />;
	}
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: styles.tabBarStyle,
				tabBarLabelStyle: styles.tabBarLabelStyle,
				tabBarIndicatorStyle: {
					backgroundColor: '#48C543',
				},
			}}
		>
			<Tab.Screen
				name="Stats"
				component={Stats}
				initialParams={{
					data: data,
				}}
			/>
			{/*<Tab.Screen name="Composition" component={LineUp} />*/}
			<Tab.Screen name="Videos" component={Videos} />
		</Tab.Navigator>
	);
}

export default function MatchPage({ route }) {
	const [data, setData] = useState(null);
	useEffect(() => {
		getMatchByProperty('id', route?.params?.id).then((res) => {
			setData(res[0]);
		});
	}, []);

	const Flag = (team_id) => {
		const sourceUrl = `https://livescore-api.com/api-client/countries/flag.json?team_id=${team_id?.team_id}&key=FokaDXFGg8272rJU&secret=tnxaGqVVwWdbzDJf14qF15lidnpfP9ai`;
		return (
			<Image
				style={{
					height: 40,
					width: 60,
				}}
				source={sourceUrl}
				contentFit="cover"
			/>
		);
	};

	return (
		<SafeView style={styles.container}>
			<PageHeader
				text={'Détails du match'}
				displayBackButton={true}
				style={{
					marginLeft: 20,
				}}
			/>
			<View style={styles.scoreContainer}>
				<View style={styles.teamContainer}>
					<Flag team_id={data?.home_id} />
					<Text style={styles.teamText}>{data?.home_name}</Text>
				</View>
				<View style={styles.score}>
					<Text style={styles.scoreInfo}>{data?.ft_score}</Text>
					<Text style={styles.time}>Terminé</Text>
				</View>
				<View style={styles.teamContainer}>
					<Flag team_id={data?.away_id} />
					<Text style={styles.teamText}>{data?.away_name}</Text>
				</View>
			</View>
			<RadioPlayer lib={data?.home_name + ' vs. ' + data?.away_name} />
			<View style={{ flex: 1 }}>
				<DetailsTabs data={data} />
			</View>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
		paddingBottom: 0,
	},
	tabBarStyle: {
		backgroundColor: '#184D39',
	},
	tabBarLabelStyle: {
		color: 'white',
		fontFamily: semibold,
	},
	scoreContainer: {
		gap: 30,
		marginTop: 20,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	teamContainer: {
		gap: 5,
		alignItems: 'center',
	},
	teamText: {
		color: 'white',
		fontFamily: bold,
		fontSize: 15,
	},
	score: {},
	scoreInfo: {
		color: 'white',
		fontSize: 30,
		fontFamily: semibold,
	},
	time: {
		color: '#D4D4D4',
		fontFamily: regular,
		textAlign: 'center',
		bottom: 0,
	},
});
