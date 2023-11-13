import { createContext, useCallback } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

SplashScreen.preventAutoHideAsync();
export const FontContext = createContext();

export const FontProvider = ({ children }) => {
	const [fontsLoaded] = useFonts({
		'srcss-smbld': require('../assets/fonts/source_sans/SourceSans3-SemiBold.ttf'),
		'srcss-rglr': require('../assets/fonts/source_sans/SourceSans3-Regular.ttf'),
		'srcss-bold': require('../assets/fonts/source_sans/SourceSans3-Bold.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return (
			<View style={styles.container}>
				<ActivityIndicator color={'#113427'} size={'large'} />
			</View>
		);
	}
	return (
		<FontContext.Provider value={{}}>
			<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
				{children}
			</View>
		</FontContext.Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#184D39',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
