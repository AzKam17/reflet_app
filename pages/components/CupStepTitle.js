import { Pressable, StyleSheet, Text } from 'react-native';
import { bold } from '../../FontsConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CupStepTitle({
	text = 'cup_step',
	onPress = () => {},
}) {
	return (
		<Pressable onPress={onPress} style={styles.container}>
			<Text style={styles.text}>{text}</Text>
			<AntDesign name={'right'} color={'white'} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		marginRight: 10,
		paddingBottom: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	text: {
		color: 'rgba(255,255,255,0.9)',
		fontFamily: bold,
		fontSize: 18,
	},
});
