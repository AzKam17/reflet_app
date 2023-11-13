import { Pressable, StyleSheet, Text, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { regular } from '../../../../FontsConfig';
import { refactorIcon } from '../../../../custom_functions/refactorIcon';

export default function PaysItem({
	icon = <></>,
	is_active = false,
	lib = 'Pays Name',
	onPress = () => {},
}) {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View
				style={[
					styles.flagContainer,
					{
						backgroundColor: is_active ? '#48C543' : '#113427',
					},
				]}
			>
				{refactorIcon(icon)}
			</View>
			<Text style={styles.text}>{lib}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: 100,
	},
	flagContainer: {
		padding: 10,
		backgroundColor: '#113427',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
	},
	text: {
		color: 'white',
		fontFamily: regular,
		fontSize: 15,
		textAlign: 'center',
	},
});
