import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Pressable, Text, View } from 'react-native';
import DefaultPage from './pages/DefaultPage';
import { ConnectivityProvider } from './provider/ConnectivityProvider';
import { CountryProvider } from './provider/CountryProvider';
import { FontProvider } from './provider/FontProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './provider/AuthProvider';
import { logoutUser } from './firebase_functions/auth/logoutUser';
import AuthPage from './pages/AuthPages';
import { RadioProvider } from './provider/RadioProvider';
import { ChatProvider } from './provider/ChatProvider';
import { ReplyProvider } from './provider/ReplyProvider';

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<FontProvider>
				<ConnectivityProvider>
					<CountryProvider>
						<SafeAreaProvider>
							<AuthProvider>
								<RadioProvider>
									<ChatProvider>
										<ReplyProvider>
											<Routes />
										</ReplyProvider>
									</ChatProvider>
								</RadioProvider>
							</AuthProvider>
						</SafeAreaProvider>
					</CountryProvider>
				</ConnectivityProvider>
			</FontProvider>
		</GestureHandlerRootView>
	);
}

const Routes = () => {
	const { user } = useAuth();
	return <>{user ? <AuthPage /> : <DefaultPage />}</>;
};
