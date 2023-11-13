import { StyleSheet, TextInput, View } from 'react-native';

export default function Input1({
	placeholder,
	leftIcon,
	rightIcon,
	onChange,
	data,
	style,
	secureTextEntry = false,
}) {
	return (
		<View style={[styles.container, style]}>
			{leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

			{/* Champ de texte */}
			<TextInput
				style={[styles.input]}
				placeholder={placeholder}
				onChangeText={onChange}
				value={data}
				placeholderTextColor={'white'}
				secureTextEntry={secureTextEntry}
				// always lowercase
				autoCapitalize="none"
			/>

			{rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: 'gray',
		borderRadius: 15,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginBottom: 12,
		backgroundColor: '#113427',
		height: 60,
	},
	input: {
		flex: 1,
		marginLeft: 8,
		color: 'white',
	},
	iconContainer: {
		padding: 8,
	},
});
