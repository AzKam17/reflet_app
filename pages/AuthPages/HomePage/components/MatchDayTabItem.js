import { Text, StyleSheet, View, Pressable } from 'react-native';
import { bold } from '../../../../FontsConfig';

export default function MatchDayTabItem({
	date = '2023-10-26',
	isActive = false,
	onPress = () => {},
}) {
	function convertirDate(chaineDate) {
		const joursSemaine = ['DI', 'LU', 'MA', 'ME', 'JE', 'VE', 'SA'];

		const date = new Date(chaineDate);
		const jourSemaine = joursSemaine[date.getDay()];
		const jour = date.getDate().toString().padStart(2, '0');
		const mois = (date.getMonth() + 1).toString().padStart(2, '0');

		return [`${jourSemaine}`, `${jour}.${mois}`];
	}

	const [dayOfTheDay, othersDetails] = convertirDate(date);

	return (
		<Pressable style={[styles.container]} onPress={onPress}>
			<View
				style={[
					styles.infoContainer,
					{
						backgroundColor: isActive ? 'white' : '#164433',
					},
				]}
			>
				<Text
					style={[
						styles.text,
						{
							color: isActive ? '#164433' : 'white',
						},
					]}
				>
					{dayOfTheDay}
				</Text>
				<Text
					style={[
						styles.text,
						{
							color: isActive ? '#164433' : 'white',
						},
					]}
				>
					{othersDetails}
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'start',
	},
	infoContainer: {
		minHeight: 30,
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#164433',
	},
	text: {
		color: 'white',
		fontFamily: bold,
	},
	isActiveBar: {
		height: 2,
		backgroundColor: '#164433',
	},
});
