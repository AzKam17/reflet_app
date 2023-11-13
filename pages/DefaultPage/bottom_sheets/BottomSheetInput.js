import { StyleSheet, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { semibold } from '../../../FontsConfig';

export default function BottomSheetInput({
	placeholder = 'bottom_sheet_input_placeholder',
	leftIcon,
	rightIcon,
	onChange,
	data,
	style,
	secureTextEntry = false,
}) {
	return (
		<View style={[styles.main_container, style]}>
			{leftIcon && <>{leftIcon}</>}
			<BottomSheetTextInput
				style={styles.input}
				placeholderTextColor={'white'}
				onChangeText={onChange}
				value={data}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
			/>
			{rightIcon && <View style={styles.left_icon}>{rightIcon}</View>}
		</View>
	);
}

const styles = StyleSheet.create({
	main_container: {
		minHeight: 60,
		backgroundColor: '#184D39',
		borderRadius: 5,
		alignItems: 'center',
		paddingRight: 20,
		paddingLeft: 20,
		flexDirection: 'row',
		gap: 10,
	},
	input: {
		color: 'white',
		fontFamily: semibold,
		fontSize: 17,
	},
	left_icon: {
		position: 'absolute',
		right: 20,
	},
});
