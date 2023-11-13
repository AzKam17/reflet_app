import SafeView from '../SafeView';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import UserCard from './components/UserCard';
import PageHeader from './components/PageHeader';
import GroupChatItem from './components/GroupChatItem';
import CountryChat from './components/CountryChat';
import TabChatItemList from './components/TabChatItemList';
import GroupChatItemList from './components/GroupChatItemList';
import ChatTab from './components/ChatTab';
import JeuxCard from './components/JeuxCard';
import { bold, semibold } from '../../../FontsConfig';
import PredictionCard from './components/PredictionCard';
import ChatPage from './ChatPage';
import GamePage from './GamePage';
import QuizPage from './QuizPage';
import PredictionPage from './PredictionPage';
import QrPage from './QrPage';
import OnboardingPage from './OnboardingPage';
import { useAuth } from '../../../provider/AuthProvider';
import { useEffect, useState } from 'react';
import BtnParcours from '../NewCommunaute/components/BtnParcours';
import CountryChatList from '../NewCommunaute/components/CountryChatList';

const Stack = createStackNavigator();

export default function Communaute() {
	return (
		<ScrollView
			style={{
				backgroundColor: '#184D39',
			}}
		>
			<SafeView style={styles.container}>
				<PageHeader text={'Djamana'} />
				<BtnParcours />
				<View style={styles.chatTitleContainer}>
					<Text style={styles.chatTitle}>Chat</Text>
				</View>
				<CountryChat />
				<GroupChatItem
					id={'BRzGaVXiP7vNY1unuy3g'}
					title={'Supporteur Mazo'}
					chatPageOptions={{
						type: 'group',
						title: 'Supporteur Mazo',
						id: 'BRzGaVXiP7vNY1unuy3g',
					}}
				/>
				<GroupChatItem
					id={'PPxCvgu0t5Y6It90Ehgy'}
					title={'Les experts'}
					chatPageOptions={{
						type: 'group',
						title: 'Les experts',
						id: 'PPxCvgu0t5Y6It90Ehgy',
					}}
				/>
				<CountryChatList />
				<Text style={styles.jeuxLib}>Jeux</Text>
				<JeuxCard />
				<PredictionCard />
				<View style={{ height: 10 }} />
			</SafeView>
		</ScrollView>
	);
}

export function CommunauteNavigator() {
	const { getUser } = useAuth();
	const [isOnboarding, setIsOnboarding] = useState(true);

	useEffect(() => {
		const status = getUser()?.onboardingCommunaute || false;
		if (status) {
			setIsOnboarding(false);
		}
	}, []);

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				//gestureEnabled: false,
			}}
		>
			{isOnboarding && (
				<Stack.Screen name={'OnboardingPage'} component={OnboardingPage} />
			)}
			<Stack.Screen name={'Communaute'} component={Communaute} />
			<Stack.Screen
				name={'ChatPage'}
				component={ChatPage}
				options={{
					gestureEnabled: false,
				}}
			/>
			<Stack.Screen name={'GamePage'} component={GamePage} />
			<Stack.Screen name={'QuizPage'} component={QuizPage} />
			<Stack.Screen name={'PredictionPage'} component={PredictionPage} />
			<Stack.Screen name={'QrPage'} component={QrPage} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		gap: 10,
	},
	jeuxLib: {
		color: 'white',
		fontFamily: semibold,
		fontSize: 20,
	},
	chatTitle: {
		color: 'white',
		fontSize: 20,
		fontFamily: bold,
	},
	chatTitleContainer: {
		alignSelf: 'flex-start',
		borderBottomColor: '#46FF6F',
		borderBottomWidth: 2,
	},
});
