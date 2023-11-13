import { Text, StyleSheet, View, Pressable } from 'react-native';
import { bold } from '../../../../FontsConfig';

export default function TabChatItem({
	title = 'TabTitle',
	isActive = false,
	onPress = () => {},
}) {
	return (
		<Pressable onPress={onPress} style={[styles.container]}>
			<Text style={styles.tabText}>{title}</Text>
			{isActive && (
				<View
					style={{
						height: 1,
						width: '100%',
						backgroundColor: 'white',
					}}
				/>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {},
	tabText: { color: 'white', fontFamily: bold, padding: 10 },
});
