import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { semibold } from '../../FontsConfig';

export default function PrimaryButton({
	text = 'primary_button_default_text',
	style = {},
	text_style = {},
	onPress = () => {},
	isLoading = false,
}) {
	return (
		<Pressable onPress={onPress} style={[styles.btn_style, style]}>
			{isLoading && <ActivityIndicator color={'white'} />}
			<Text style={[styles.text_style, text_style]}>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	btn_style: {
		padding: 10,
		backgroundColor: '#48C543',
		alignSelf: 'flex-start',
		borderRadius: 5,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 5,
	},
	text_style: {
		color: 'white',
		fontFamily: semibold,
		fontSize: 15,
	},
});
