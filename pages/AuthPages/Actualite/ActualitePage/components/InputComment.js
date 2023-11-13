import { Pressable, Text, StyleSheet, TextInput, View } from 'react-native';
import { regular } from '../../../../../FontsConfig';

export default function InputComment() {
	return (
		<View style={styles.container}>
			<View style={styles.avatar} />
			<TextInput
				placeholder={'Votre commentaire'}
				placeholderTextColor={'white'}
				multiline={true}
				style={styles.comment}
			/>
			<Pressable style={styles.btn}>
				<Text style={styles.btnText}>Envoyer</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 5,
		marginTop: 5,
		marginBottom: 30,
	},
	avatar: {
		height: 30,
		width: 30,
		backgroundColor: 'black',
		borderRadius: 100,
	},
	comment: {
		color: 'white',
		fontFamily: regular,
		borderBottomColor: 'white',
		borderBottomWidth: 1,
		flex: 1,
	},
	btn: {
		alignSelf: 'start',
		padding: 5,
		backgroundColor: '#113427',
		borderRadius: 5,
	},
	btnText: {
		color: 'white',
		fontFamily: regular,
	},
});
