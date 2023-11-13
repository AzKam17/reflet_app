import { Pressable, Text, StyleSheet, View } from 'react-native';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'react-native-svg';

export default function TopActualite() {
	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				console.log('TopActualite');
			}}
		>
			<ImageBackground
				style={styles.imgBack}
				source={require('../../../../assets/images/banner/banner1.png')}
			>
				<View
					style={{
						minHeight: 100,
						maxHeight: 100,
						padding: 20,
					}}
				>
					<Text
						style={{
							color: 'white',
							fontSize: 10,
							fontFamily: 'srcss-smbld',
							padding: 5,
							paddingLeft: 10,
							paddingRight: 10,
							backgroundColor: 'black',
							alignSelf: 'flex-start',
						}}
					>
						Rapport
					</Text>
				</View>
				<LinearGradient
					locations={[0, 0.9]}
					colors={['transparent', 'rgba(0,0,0,1)']}
					style={{
						minHeight: 100,
						maxHeight: 100,
						padding: 20,
						justifyContent: 'flex-end',
					}}
				>
					<Text
						style={{
							color: 'white',
							fontSize: 10,
							fontFamily: 'srcss-smbld',
							padding: 5,
							backgroundColor: '#F17228',
							alignSelf: 'flex-start',
						}}
					>
						Cameroun
					</Text>
					<Text style={{ color: 'white', marginTop: 5 }}>
						CAN 2022 : le Cameroun fini à la 3e place
					</Text>
				</LinearGradient>
			</ImageBackground>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
		marginRight: 20,
	},
	imgBack: {
		height: 200,
		justifyContent: 'flex-end',
	},
	tag: {
		color: 'white',
		fontSize: 10,
		fontFamily: 'srcss-smbld',
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: 'black',
		alignSelf: 'flex-start',
	},
});
