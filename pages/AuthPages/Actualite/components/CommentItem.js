import { Text, StyleSheet, View } from 'react-native';
import { regular } from '../../../../FontsConfig';

export default function CommentItem() {
	return (
		<View style={styles.container}>
			<View style={styles.avatar} />
			<View>
				<Text style={styles.username}>Maya</Text>
				<Text style={styles.comment}>
					Lorem ipsum dolor sit amet, consectetur {'\n'}adipiscing elit.
					Pellentesque eget nisi sem.{' '}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 5,
		marginTop: 5,
	},
	avatar: {
		height: 30,
		width: 30,
		backgroundColor: 'black',
		borderRadius: 100,
	},
	comment: {
		color: 'rgba(255,255,255,0.7)',
		fontFamily: regular,
	},
	username: {
		color: 'rgba(255,255,255,1)',
		fontFamily: regular,
	},
});
