import SafeView from '../../SafeView';
import { StyleSheet, View } from 'react-native';
import PageHeader from '../components/PageHeader';
import UserInfoCard from './components/UserInfoCard';
import GameList from './components/GameList';

export default function GamePage() {
	return (
		<SafeView style={styles.container}>
			<View style={styles.infosContainer}>
				<PageHeader text={'Jeux'} displayBackButton={true} />
				<UserInfoCard />
			</View>
			<GameList />
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		paddingBottom: 0,
	},
	infosContainer: {
		gap: 10,
		paddingRight: 20,
		paddingLeft: 20,
	},
});
