import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Videos() {
	return (
		<View style={styles.container}>
			<WebView
				style={{
					maxHeight: 300,
				}}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				source={{
					uri: 'https://www.youtube.com/embed/RdbVVuFHnMQ?showinfo=1&modestbranding=1',
				}}
			/>
			<WebView
				style={{
					maxHeight: 300,
				}}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				source={{
					uri: 'https://www.youtube.com/embed/RdbVVuFHnMQ?showinfo=1&modestbranding=1',
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#184D39',
		padding: 20,
		gap: 10,
	},
});
