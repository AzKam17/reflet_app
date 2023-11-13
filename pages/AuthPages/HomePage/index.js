import React from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	ScrollView,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import SafeView from '../SafeView';
import LogoCanSVG from '../../../assets/icons/LogoCanSVG';
import { Image } from 'expo-image';
import MatchDaySelector from './components/MatchDaySelector';
import { bold } from '../../../FontsConfig';
import TopActualite from '../Actualite/components/TopActualite';
import { createStackNavigator } from '@react-navigation/stack';
import MatchPage from '../MatchPage';
import { useEffect, useState } from 'react';
import { GetCountries } from '../../../fixtures/CountryRepository';
import MatchItem from '../../components/MatchItem';
import CupStepTitle from '../../components/CupStepTitle';
import MatchItemHomeList from '../../components/MatchItemHomeList';
import ParcoursButton from './components/ParcoursButton';

const Stack = createStackNavigator();
export default function HomePage() {
	const win = Dimensions.get('window');
	return (
		<SafeView style={[styles.container, { paddingBottom: 0 }]}>
			<ScrollView>
				<Banner />
				<AppHomePageCarousel />
				<View style={{ height: 10 }} />
				<View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
					<MatchItemHomeList />
				</View>
			</ScrollView>
		</SafeView>
	);
}

const Banner = () => {
	const win = Dimensions.get('window');
	return (
		<View
			style={{
				padding: 20,
			}}
		>
			<Image
				style={{
					contentFit: 'cover',
					maxWidth: win.width,
					height: win.width * 0.5,
				}}
				source={require('../../../assets/images/sadio_mane.png')}
			/>
		</View>
	);
};

const AppHomePageCarousel = () => {
	const [isReady, setIsReady] = useState(false);
	const [defaultFlags, setDefaultFlags] = useState([]);

	useEffect(() => {
		try {
			GetCountries().then((res) => {
				const updatedFlags = res.map((flag) => ({
					...flag,
					icon: React.cloneElement(flag.icon, {
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
					}),
				}));
				setDefaultFlags(updatedFlags);
				setIsReady(true);
			});
		} catch (e) {
			console.log(e, ' ', e.line);
		}
	}, []);

	if (!isReady) {
		return <ActivityIndicator />;
	}

	return (
		<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
			{defaultFlags.map((flag, idx) => {
				return (
					<Pressable
						key={idx}
						style={{
							alignItems: 'center',
							paddingTop: 15,
							paddingBottom: 15,
							backgroundColor: '#113427',
							marginRight: 10,
							borderRadius: 16,
							width: 110,
							justifyContent: 'center',
						}}
						onPress={() => console.log(flag.id)}
					>
						{defaultFlags[idx].icon}
						<Text
							style={[
								{
									fontFamily: bold,
									fontSize: 12,
									color: 'white',
									textAlign: 'center',
								},
							]}
						>
							{defaultFlags[idx].lib}
						</Text>
					</Pressable>
				);
			})}
		</ScrollView>
	);
};

export function HomePageNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName={'HomePage'}
		>
			<Stack.Screen name={'HomePage'} component={HomePage} />
			<Stack.Screen name={'MatchPage'} component={MatchPage} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
	},
	headerText: {
		color: 'white',
		fontFamily: bold,
		paddingLeft: 20,
		fontSize: 20,
	},
	topActuBox: {
		marginTop: 10,
	},
});
