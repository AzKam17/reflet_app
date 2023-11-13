import SafeView from '../SafeView';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { bold } from '../../../FontsConfig';
import ActualiteList from './components/ActualiteList';
import { createStackNavigator } from '@react-navigation/stack';
import ActualitePage from './ActualitePage';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Input1 from '../../components/Input1';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VerticalCountryScrollview from './components/VerticalCountryScrollview';
import GridActualite from './components/GridActualite';
import LineActualite from './components/LineActualite';
import { getAllNews } from '../../../firebase_functions/news/getAllNews';

const Stack = createStackNavigator();

export default function Actualite() {
	const [news, setNews] = useState(null);
	useEffect(() => {
		getAllNews().then((r) => setNews(r));
	}, []);

	if (!news) {
		return (
			<SafeView style={styles.container}>
				<ActivityIndicator />
			</SafeView>
		);
	}

	return (
		<SafeView style={styles.container}>
			<Text style={styles.text}>Actualités</Text>
			<Input1
				placeholder={"Rechercher d'équipes, de matchs..."}
				leftIcon={<AntDesign name={'search1'} color={'white'} size={15} />}
				style={{
					marginRight: 20,
					marginLeft: 20,
				}}
			/>
			<VerticalCountryScrollview />
			<Text
				style={[
					styles.text,
					{
						padding: 0,
						fontSize: 17,
						marginLeft: 20,
						paddingTop: 13,
						paddingBottom: 13,
					},
				]}
			>
				Actualité en vogue
			</Text>
			<View>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					style={{
						gap: 5,
					}}
				>
					<View style={{ width: 20 }} />
					{news
						.filter((el) => el.type === 'grid')
						.map((el, idx) => (
							<GridActualite key={idx} data={el} />
						))}
				</ScrollView>
			</View>
			<View
				style={{
					marginTop: 10,
				}}
			>
				<ScrollView
					style={{
						paddingRight: 20,
						paddingLeft: 20,
					}}
				>
					{news
						.filter((el) => el.type === 'list')
						.map((el, idx) => (
							<LineActualite key={idx} data={el} />
						))}
				</ScrollView>
			</View>
		</SafeView>
	);
}

export function ActualiteNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				gestureEnabled: false,
				headerShown: false,
			}}
		>
			<Stack.Screen name={'ActualiteFeed'} component={Actualite} />
			<Stack.Screen name={'ActualitePage'} component={ActualitePage} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		padding: 20,
		paddingBottom: 0,
		fontFamily: bold,
		color: 'white',
		fontSize: 30,
	},
});
