import { Text, StyleSheet, View, Pressable } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { bold, semibold } from '../../../../FontsConfig';
import { useNavigation } from '@react-navigation/native';
import { useCountry } from '../../../../provider/CountryProvider';
import { Image } from 'expo-image';

export default function MatchItem({
	id,
	home_id,
	away_id,
	home,
	away,
	ft_score = '2 - 0',
}) {
	const { getCountries, getPaysInfoFromISOCode } = useCountry();
	const navigation = useNavigation();

	const Flag = (team_id) => {
		const sourceUrl = `https://livescore-api.com/api-client/countries/flag.json?team_id=${team_id?.team_id}&key=FokaDXFGg8272rJU&secret=tnxaGqVVwWdbzDJf14qF15lidnpfP9ai`;
		return (
			<Image
				style={{
					height: 20,
					width: 35,
				}}
				source={sourceUrl}
				contentFit="cover"
			/>
		);
	};

	return (
		<Pressable
			style={styles.container}
			onPress={() =>
				navigation.navigate('MatchPage', {
					id: id,
				})
			}
		>
			<View style={styles.teamsContainer}>
				<View style={styles.teamsLine}>
					<Flag team_id={home_id} />
					<Text style={styles.singleTeamText}>{home}</Text>
				</View>
				<View style={styles.teamsLine}>
					<Flag team_id={away_id} />
					<Text style={styles.singleTeamText}>{away}</Text>
				</View>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.infoTextFirst}>Terminé</Text>
				<Text style={styles.infoTextSec}>{ft_score}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#164433',
		padding: 10,
	},
	teamsContainer: {
		gap: 5,
	},
	teamsLine: {
		gap: 3,
		flexDirection: 'row',
	},
	singleTeamText: {
		color: 'white',
		fontFamily: semibold,
	},
	infoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoTextFirst: {
		color: 'white',
		fontFamily: semibold,
	},
	infoTextSec: {
		color: 'white',
		fontSize: 20,
		fontFamily: bold,
	},
});
