import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import SafeView from '../SafeView';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bold } from '../../../FontsConfig';
import { Image, ImageBackground } from 'expo-image';

export default function Parcours() {
	const navigation = useNavigation();
	return (
		<SafeView style={styles.container}>
			<View style={styles.header}>
				<GoBackButton />
				<Text style={styles.title}>Le supporter{'\n'}C'Zo</Text>
			</View>
			<View
				style={{
					flex: 1,
				}}
			>
				<ImageBackground
					style={{
						flex: 1,
						gap: 5,
					}}
					imageStyle={{
						borderRadius: 10,
					}}
					source={require('../../../assets/parcours/za.png')}
				>
					<View style={{ flex: 1, flexDirection: 'row', gap: 5 }}>
						<View style={{ flex: 1, gap: 5 }}>
							<View style={[styles.borders, { flex: 1 }]}></View>
							<View style={{ flex: 2, flexDirection: 'row', gap: 5 }}>
								<View style={[styles.borders, { flex: 1 }]}></View>
								<View style={[styles.borders, { flex: 1 }]}></View>
							</View>
						</View>
						<View style={{ flex: 1, gap: 5 }}>
							<View style={[styles.borders, { flex: 2 }]}></View>
							<View style={[styles.borders, { flex: 1 }]}></View>
						</View>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', gap: 5 }}>
						<View style={{ flex: 1, gap: 5 }}>
							<View style={[styles.borders, { flex: 1 }]}></View>
							<View style={[styles.borders, { flex: 2 }]}></View>
						</View>
						<View style={{ flex: 1, gap: 5 }}>
							<View style={{ flex: 2, flexDirection: 'row', gap: 5 }}>
								<View style={[styles.borders, { flex: 1 }]}></View>
								<View style={[styles.borders, { flex: 1 }]}></View>
							</View>
							<View style={[styles.borders, { flex: 1 }]}></View>
						</View>
					</View>
				</ImageBackground>
			</View>
		</SafeView>
	);
}

const GoBackButton = () => {
	const navigation = useNavigation();
	return (
		<Pressable
			style={styles.backButton}
			onPress={() => {
				navigation.goBack();
			}}
		>
			<Ionicons name={'arrow-back'} color={'white'} size={20} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, paddingLeft: 20, paddingRight: 20 },
	header: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	title: {
		color: 'white',
		fontFamily: bold,
		fontSize: 30,
	},
	backButton: {
		marginTop: 10,
		padding: 10,
		backgroundColor: '#113427',
		alignSelf: 'flex-start',
		borderRadius: 100,
	},
	borders: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: 'rgba(255,255,255,0.4)',
		backgroundColor: '#D4D4D4',
	},
});
