import { Pressable, StyleSheet, Text, View } from 'react-native';
import { bold } from '../../../../FontsConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function BtnParcours() {
	const navigation = useNavigation();
	return (
		<Pressable
			style={styles.container}
			onPress={() => navigation.navigate('Parcours')}
		>
			<Text style={styles.text}>Le supporter{'\n'}C'Zo</Text>
			<AntDesign name={'right'} color={'black'} size={30} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 15,
		borderLeftColor: '#46FF6F',
		borderLeftWidth: 3,
	},
	text: {
		color: 'black',
		fontFamily: bold,
		fontSize: 20,
	},
});
