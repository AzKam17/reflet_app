import { Pressable, StyleSheet, Text } from 'react-native';
import { bold } from '../../../../FontsConfig';
import { useNavigation } from '@react-navigation/native';

export default function ParcoursButton() {
	const navigation = useNavigation();
	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				navigation.navigate('Parcours');
			}}
		>
			<Text style={styles.text}>Parcours du supporter</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: '#113427',
		borderRadius: 30,
		borderWidth: 1,
		borderColor: '#48C543',
	},
	text: {
		fontFamily: bold,
		color: 'white',
	},
});
