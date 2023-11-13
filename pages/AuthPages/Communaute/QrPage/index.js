import { StyleSheet, Text, View } from 'react-native';
import SafeView from '../../SafeView';
import PageHeader from '../components/PageHeader';
import QRCode from 'react-native-qrcode-svg';

export default function QrPage() {
	return (
		<SafeView style={styles.container}>
			<PageHeader
				text={'Echange de points'}
				displayBackButton={true}
				style={{
					marginLeft: 20,
				}}
			/>
			<View style={styles.qrContainer}>
				<Text
					style={{
						fontSize: 20,
						textAlign: 'center',
						marginBottom: 10,
					}}
				>
					Faites scanner votre QR Code en échange de cadeaux !
				</Text>
				<QRCode value={'https://google.fr'} size={300} />
			</View>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
		paddingBottom: 0,
	},
	qrContainer: {
		flex: 1,
		backgroundColor: 'white',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
