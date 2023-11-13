import { Text, StyleSheet, View, Pressable } from 'react-native';
import { bold, regular } from '../../../../FontsConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../../provider/AuthProvider';
import { useEffect, useState } from 'react';
import { useCountry } from '../../../../provider/CountryProvider';
import { GetCountryBySlug } from '../../../../fixtures/CountryRepository';

export default function UserCard() {
	const { getUser, firestoreUser } = useAuth();
	const { getPaysInfoFromISOCode } = useCountry();
	const [user, setUser] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		const tempUser = getUser();
		setUser(tempUser);
	}, []);

	return (
		<View style={styles.container}>
			<View
				style={{
					gap: 10,
					flexDirection: 'row',
				}}
			>
				<View style={styles.avatar} />
				<View style={styles.infoContainer}>
					<Text style={styles.userName}>
						{user?.username || "Nom d'utilisateur"}
					</Text>
					<View style={styles.statsContainer}>
						<Text style={styles.statsData}>
							{firestoreUser?.points || 0} 🏆{' - '}Team{' '}
							{GetCountryBySlug(getUser()?.prefered_country)?.lib}
						</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					justifyContent: 'center',
				}}
			>
				<Pressable
					onPress={() => navigation.navigate('QrPage')}
					style={{
						padding: 8,
						borderRadius: 100,
						backgroundColor: '#113427',
					}}
				>
					<AntDesign name={'qrcode'} size={30} color={'#48C543'} />
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	avatar: {
		height: 50,
		width: 50,
		backgroundColor: 'black',
		borderRadius: 100,
	},
	infoContainer: {
		justifyContent: 'center',
	},
	userName: {
		color: 'white',
		fontFamily: bold,
	},
	statsContainer: {
		flexDirection: 'row',
	},
	statsData: {
		color: 'rgba(255,255,255,0.9)',
		fontFamily: regular,
	},
});
