import { Text, StyleSheet, View } from 'react-native';
import { bold, semibold } from '../../../../../FontsConfig';
import { useAuth } from '../../../../../provider/AuthProvider';
import { useEffect, useState } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function UserInfoCard() {
	const { getUser, firestoreUser } = useAuth();
	const [user, setUser] = useState({});
	useEffect(() => {
		setUser(getUser());
	}, []);
	return (
		<View style={styles.container}>
			<Text style={styles.greeting}>Bonjour, {user?.username}</Text>
			<Text style={styles.info}>
				Vous avez {firestoreUser?.points} 🏆, jouez pour gagner des points !
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	greeting: {
		color: 'white',
		fontSize: 15,
		fontFamily: semibold,
	},
	info: {
		fontSize: 17,
		color: 'white',
		fontFamily: bold,
	},
});
