import SafeView from '../SafeView';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PageHeader from '../Communaute/components/PageHeader';
import BtnParcours from './components/BtnParcours';
import { bold } from '../../../FontsConfig';
import CountryChat from '../Communaute/components/CountryChat';
import GroupChatItem from '../Communaute/components/GroupChatItem';
import CountryChatList from './components/CountryChatList';

export default function NewCommunaute() {
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
			</SafeView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		gap: 10,
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
