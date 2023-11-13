import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { semibold } from '../../../../FontsConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRadio } from '../../../../provider/RadioProvider';
import { useEffect, useState } from 'react';

export default function RadioPlayer({ lib }) {
	const { playSound, setName, stopSound, getStatus } = useRadio();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (getStatus()) {
			setLoading(false);
		}
	});

	const play = () => {
		setName(lib);
		playSound();
	};

	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					backgroundColor: getStatus() ? '#F17228' : '#113427',
				},
			]}
			onPress={() => {
				if (getStatus()) {
					stopSound();
				} else {
					play();
				}
			}}
		>
			<AntDesign name={'play'} size={17} color={'white'} />
			<Text style={styles.text}>Radio France International</Text>
			{loading && <ActivityIndicator size="small" />}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 5,
		padding: 10,
		backgroundColor: '#113427',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 15,
		flexDirection: 'row',
		borderColor: 'white',
		borderWidth: 0.2,
	},
	text: {
		color: 'white',
		fontFamily: semibold,
	},
});
