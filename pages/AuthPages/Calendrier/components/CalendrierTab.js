import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { GetMatchs } from '../../../../fixtures/MatchRepository';
import {
	comparerDates,
	sortDatesInAscendingOrder,
	summarizeDate,
} from '../../../../custom_functions/comparerDates';
import { bold, semibold } from '../../../../FontsConfig';
import { useCountry } from '../../../../provider/CountryProvider';
import { GetCountry } from '../../../../fixtures/CountryRepository';

export default function CalendrierTab() {
	const [matchs, setMatchs] = useState([]);
	const [selectedDate, setSelectedDate] = useState([]);
	useEffect(() => {
		let data = [];
		GetMatchs().map((el, idx) => {
			data = [...data, ...el?.matchs];
		});
		setMatchs(data);
		setSelectedDate(data[0].date);
	}, []);
	return (
		<View
			style={{
				flex: 1,
				marginTop: 10,
			}}
		>
			<DatesCarousel
				data={matchs}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
			<View
				style={{
					gap: 10,
					paddingTop: 10,
				}}
			>
				{matchs
					.filter((el) => el.date === selectedDate)
					.map((el, idx) => {
						return <MatchItem key={idx} {...el} />;
					})}
			</View>
		</View>
	);
}

const DatesCarousel = ({ data, selectedDate, setSelectedDate }) => {
	const [dates, setDates] = useState([]);

	useEffect(() => {
		let tempDates = [];
		data.map((el, idx) => {
			tempDates.push(el?.date);
		});
		tempDates = sortDatesInAscendingOrder(tempDates);
		setDates(tempDates);
	}, [data]);

	return (
		<View>
			<ScrollView
				horizontal={true}
				style={{
					alignSelf: 'center',
					borderRadius: 10,
				}}
			>
				{dates.map((el, idx) => {
					return (
						<DateItem
							key={idx}
							lib={el}
							isActive={selectedDate === el}
							setSelectedDate={setSelectedDate}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
};

const DateItem = ({ lib, isActive, setSelectedDate }) => {
	return (
		<Pressable
			onPress={() => setSelectedDate(lib)}
			style={{
				padding: 10,
				backgroundColor: isActive ? '#48C543' : '#113427',
			}}
		>
			<Text
				style={{
					textAlign: 'center',
					fontFamily: bold,
					color: 'white',
				}}
			>
				{summarizeDate(lib)}
			</Text>
		</Pressable>
	);
};

const MatchItem = ({
	id = null,
	homeTeamId = null,
	awayTeamId = null,
	stade = '',
	date = '',
	hour = '',
}) => {
	const [homeTeam, setHomeTeam] = useState(null);
	const [awayTeam, setAwayTeam] = useState(null);

	useEffect(() => {
		GetCountry(homeTeamId).then((res) => setHomeTeam(res));
	}, [homeTeamId]);
	useEffect(() => {
		GetCountry(awayTeamId).then((res) => setAwayTeam(res));
	}, [awayTeam]);

	if (!homeTeam && !awayTeam) {
		return <ActivityIndicator />;
	}

	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: '#113427',
				borderRadius: 10,
				padding: 10,
				justifyContent: 'space-around',
			}}
		>
			<View style={{ alignItems: 'center' }}>
				{homeTeam?.icon}
				<Text
					style={{
						color: 'white',
						fontFamily: semibold,
					}}
				>
					{homeTeam?.lib}
				</Text>
			</View>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text
					style={{
						fontSize: 15,
						color: 'white',
						fontFamily: bold,
					}}
				>
					{date}
				</Text>
				<Text
					style={{
						color: 'white',
						fontFamily: semibold,
					}}
				>
					{hour}
				</Text>
				<Text
					style={{
						color: 'white',
						fontFamily: semibold,
					}}
				>
					{stade}
				</Text>
			</View>
			<View style={{ alignItems: 'center' }}>
				{awayTeam?.icon}
				<Text
					style={{
						color: 'white',
						fontFamily: semibold,
					}}
				>
					{awayTeam?.lib}
				</Text>
			</View>
		</View>
	);
};
