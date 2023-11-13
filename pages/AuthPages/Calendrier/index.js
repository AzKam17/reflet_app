import SafeView from '../SafeView';
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCountry } from '../../../provider/CountryProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountryFlag from 'react-native-country-flag';
import { Image } from 'expo-image';
import { GetMatchs } from '../../../fixtures/MatchRepository';
import { GetCountry } from '../../../fixtures/CountryRepository';
import { regular } from '../../../FontsConfig';
import ClassementList from './components/ClassementList';
import EquipeList from './components/EquipeList';
import CalendrierTab from './components/CalendrierTab';

export default function Calendrier() {
	const { getCountries } = useCountry();
	const [inputVal, setInputVal] = useState(null);
	const [selectedTab, setSelectedTab] = useState(0);
	const [pays, setPays] = useState(null);

	useEffect(() => {
		setPays(getCountries());
	}, []);

	const checkSelectedTab = (val) => {
		return selectedTab === val;
	};

	if (!pays) {
		return null;
	}

	return (
		<SafeView style={styles.container}>
			<ScrollView>
				<Input1
					leftIcon={<AntDesign name={'search1'} color={'white'} />}
					placeholder={'Recherche votre équipe...'}
					style={{
						backgroundColor: '#113427',
					}}
					onChange={setInputVal}
				/>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					<CalendarFilterButton
						isActive={checkSelectedTab(0)}
						onPress={() => setSelectedTab(0)}
						title={'Journée'}
					/>
					<CalendarFilterButton
						isActive={checkSelectedTab(1)}
						onPress={() => setSelectedTab(1)}
						title={'Classement'}
					/>
					<CalendarFilterButton
						isActive={checkSelectedTab(2)}
						onPress={() => setSelectedTab(2)}
						title={'Équipe'}
					/>
					<CalendarFilterButton
						isActive={checkSelectedTab(3)}
						onPress={() => setSelectedTab(3)}
						title={'Calendrier'}
					/>
				</ScrollView>
				<View>{checkSelectedTab(0) && <Journee />}</View>
				<View>{checkSelectedTab(1) && <ClassementList />}</View>
				<View>{checkSelectedTab(2) && <EquipeList />}</View>
				<View>{checkSelectedTab(3) && <CalendrierTab />}</View>
			</ScrollView>
		</SafeView>
	);
}

function Input1({
	placeholder,
	leftIcon,
	rightIcon,
	onChange,
	data,
	style,
	secureTextEntry = false,
}) {
	return (
		<View style={[styles.inputContainer, style]}>
			{leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

			{/* Champ de texte */}
			<TextInput
				style={[styles.input]}
				placeholder={placeholder}
				onChangeText={onChange}
				value={data}
				placeholderTextColor={'white'}
				secureTextEntry={secureTextEntry}
				// always lowercase
				autoCapitalize="none"
			/>

			{rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
		</View>
	);
}

const Journee = () => {
	const [match, setMatch] = useState([]);

	useEffect(() => {
		setMatch(GetMatchs());
	}, []);

	return (
		<>
			{match.map((el, idx) => {
				return (
					<View key={idx}>
						<JourneeHeader text={el?.step} />
						{el.matchs.map((el1, idx1) => {
							return (
								<MatchItem
									key={idx + '-' + idx1}
									awayTeamId={el1?.awayTeamId}
									homeTeamId={el1?.homeTeamId}
									stade={el1?.stade}
									heure={el1?.date + '\n' + el1?.hour}
									homeTeamScore={3}
									awayTeamScore={9}
								/>
							);
						})}
					</View>
				);
			})}
		</>
	);
};

const CalendarFilterButton = ({
	title = 'default',
	onPress,
	isActive = false,
}) => {
	return (
		<Pressable
			onPress={onPress}
			style={{
				padding: 5,
				backgroundColor: isActive ? '#113427' : 'transparent',
				borderRadius: 20,
				marginRight: 2,
				marginLeft: 2,
			}}
		>
			<Text
				style={{
					fontFamily: 'srcss-smbld',
					color: 'white',
				}}
			>
				{title}
			</Text>
		</Pressable>
	);
};

const JourneeHeader = ({ text }) => {
	return (
		<View
			style={{
				marginRight: 10,
				marginLeft: 10,
				borderBottomWidth: 1,
				borderBottomColor: '#48C543',
			}}
		>
			<Text
				style={{
					textAlign: 'center',
					color: '#48C543',
					fontFamily: 'srcss-bold',
				}}
			>
				{text}
			</Text>
		</View>
	);
};

const MatchItem = ({
	homeTeamId = 0,
	awayTeamId = 0,
	homeTeamScore = null,
	awayTeamScore = null,
	stade = '',
	heure = '',
}) => {
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

	if (loading) {
		return <ActivityIndicator />;
	}

	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: '#164433',
				marginTop: 5,
				marginBottom: 5,
				paddingTop: 5,
				paddingBottom: 5,
				borderRadius: 15,
			}}
		>
			<View style={{ flex: 1, alignItems: 'center' }}>
				{styleIcon(homeTeam)}
				<Text
					style={{
						color: 'white',
						fontFamily: 'srcss-smbld',
					}}
				>
					{homeTeam.lib}
				</Text>
			</View>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text
					style={{
						color: 'white',
						fontSize: 13,
						fontFamily: 'srcss-bold',
					}}
				>
					{stade}
				</Text>
				<Text
					style={{
						color: 'white',
						fontFamily: regular,
						width: '100%',
						textAlign: 'center',
						fontSize: 14,
					}}
				>
					{heure}
				</Text>
			</View>
			<View style={{ flex: 1, alignItems: 'center' }}>
				{styleIcon(awayTeam)}
				<Text
					style={{
						color: 'white',
						fontFamily: 'srcss-smbld',
					}}
				>
					{awayTeam.lib}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingRight: 20,
		paddingLeft: 20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: 'gray',
		borderRadius: 15,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginBottom: 12,
		backgroundColor: '#184D39',
		height: 60,
	},
	input: {
		flex: 1,
		marginLeft: 8,
		color: 'white',
	},
	iconContainer: {
		padding: 8,
	},
});
