import {
	Text,
	StyleSheet,
	View,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import { bold, regular } from '../../../../FontsConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function PageHeader({
	text = 'HeaderText',
	displayBackButton = false,
	style = {},
	callBack = () => {},
}) {
	const navigation = useNavigation();
	return (
		<View style={[styles.container, style]}>
			{displayBackButton && (
				<TouchableOpacity
					style={styles.backIcon}
					onPress={() => {
						navigation.goBack();
						callBack();
					}}
				>
					<Ionicons name={'chevron-back-outline'} color={'white'} size={20} />
				</TouchableOpacity>
			)}
			<Text style={styles.headerText}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerText: {
		color: 'white',
		fontFamily: bold,
		fontSize: 30,
	},
	backIcon: {
		backgroundColor: '#113427',
		borderRadius: 100,
		padding: 5,
		alignSelf: 'start',
		left: 0,
		position: 'absolute',
		top: 7,
	},
});
