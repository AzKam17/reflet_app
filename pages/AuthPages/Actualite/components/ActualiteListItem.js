import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	Pressable,
	ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { bold, semibold } from '../../../../FontsConfig';
import CountryFlag from 'react-native-country-flag';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { getFile } from '../../../../firebase_functions/storage/getFile';
import { useEffect, useState } from 'react';

export default function ActualiteListItem({
	title = 'title',
	image = null,
	text = '',
}) {
	const navigation = useNavigation();
	const [imgUrl, setImgUrl] = useState(null);
	const [imgLoaded, setImgLoaded] = useState(false);

	useEffect(() => {
		getFile(image).then((res) => {
			setImgLoaded(true);
			setImgUrl(res);
		});
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<CountryFlag isoCode={'ci'} size={20} />
				<Text style={styles.text}>{title.slice(0, 40) + '...'}</Text>
			</View>
			<Pressable
				onPress={() =>
					navigation.navigate('ActualitePage', {
						data: { title, imgUrl, text },
					})
				}
			>
				{!imgLoaded ? (
					<View
						style={{
							height: 150,
							justifyContent: 'center',
						}}
					>
						<ActivityIndicator />
					</View>
				) : (
					<Image
						style={{
							height: 150,
						}}
						source={{
							uri: imgUrl,
						}}
					/>
				)}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		marginTop: 5,
		paddingTop: 0,
		paddingBottom: 0,
	},
	header: {
		padding: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: '#113427',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	bottomBox: {
		padding: 10,
		flexDirection: 'row-reverse',
		backgroundColor: '#113427',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		gap: 10,
	},
	text: {
		color: 'white',
		fontFamily: bold,
	},
	statsContainer: {
		gap: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	statsText: {
		color: 'white',
		fontFamily: semibold,
	},
});
