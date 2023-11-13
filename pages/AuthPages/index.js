import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomePageNavigator } from './HomePage';
import { Text, StyleSheet } from 'react-native';
import { semibold } from '../../FontsConfig';
import Octicons from 'react-native-vector-icons/Octicons';
import Profil from './Profil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActualiteNavigator } from './Actualite';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Calendrier from './Calendrier';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Communaute, { CommunauteNavigator } from './Communaute';
import TeamSelection from './TeamSelection';

import HomeSVG from '../../assets/icons/home.svg';
import CommunauteSVG from '../../assets/icons/communaute.svg';
import DiscoverySVG from '../../assets/icons/discovery.svg';
import CalendrierSVG from '../../assets/icons/calendrier.svg';
import ProfileSVG from '../../assets/icons/profile.svg';
import Parcours from './Parcours';
import NewCommunaute from './NewCommunaute';

const Tab = createBottomTabNavigator();

export default function AuthPage() {
	const iconSize = 20;
	const optionsToHideFromTap = {
		tabBarStyle: {
			display: 'none',
		},
		tabBarButton: (props) => null,
	};
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarStyle: styles.tabBarStyle,
					tabBarActiveTintColor: '#48C543',
					tabBarLabelStyle: styles.tabsTextStyle,
				}}
				initialRouteName={'TeamSelection'}
			>
				<Tab.Screen
					name={'HomePageNavigator'}
					component={HomePageNavigator}
					options={{
						tabBarLabel: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>Accueil</Text>
							) : (
								<></>
							);
						},
						tabBarIcon: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>•</Text>
							) : (
								<HomeSVG color={color} size={iconSize} />
							);
						},
					}}
				/>
				<Tab.Screen
					name={'Actualite'}
					component={ActualiteNavigator}
					options={{
						tabBarLabel: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>Actualités</Text>
							) : (
								<></>
							);
						},
						tabBarIcon: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>•</Text>
							) : (
								<DiscoverySVG color={color} size={iconSize} />
							);
						},
					}}
				/>
				<Tab.Screen
					name={'CommunauteNavigator'}
					component={Communaute}
					options={{
						tabBarLabel: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>Djamana</Text>
							) : (
								<></>
							);
						},
						tabBarIcon: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>•</Text>
							) : (
								<CommunauteSVG color={color} size={iconSize} />
							);
						},
					}}
				/>
				<Tab.Screen
					name={'Calendrier'}
					component={Calendrier}
					options={{
						tabBarLabel: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>Calendrier</Text>
							) : (
								<></>
							);
						},
						tabBarIcon: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>•</Text>
							) : (
								<CalendrierSVG size={25} height={20} width={20} />
							);
						},
					}}
				/>
				<Tab.Screen
					name={'Profil'}
					component={Profil}
					options={{
						tabBarLabel: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>Profil</Text>
							) : (
								<></>
							);
						},
						tabBarIcon: ({ color, focused }) => {
							return focused ? (
								<Text style={styles.tabsTextStyle}>•</Text>
							) : (
								<ProfileSVG color={color} size={iconSize} />
							);
						},
					}}
				/>
				<Tab.Screen
					name={'TeamSelection'}
					component={TeamSelection}
					options={optionsToHideFromTap}
				/>
				<Tab.Screen
					name={'Parcours'}
					component={Parcours}
					options={optionsToHideFromTap}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	tabBarStyle: {
		backgroundColor: '#113427',
		borderTopColor: 'transparent',
		borderTopWidth: 2,
	},
	tabsTextStyle: {
		fontSize: 13,
		fontFamily: semibold,
		color: 'white',
	},
});
