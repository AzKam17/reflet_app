import SafeView from '../../SafeView';
import { StyleSheet, Text, View } from 'react-native';
import PageHeader from '../components/PageHeader';
import MessageList from './components/MessageList';
import InputMessage from './components/InputMessage';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../provider/AuthProvider';
import { useCountry } from '../../../../provider/CountryProvider';
import { useChat } from '../../../../provider/ChatProvider';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReplyBox from './components/ReplyBox';

export default function ChatPage({ route }) {
	const options = route.params;
	const { resetRoomCount } = useChat();
	const { getUser } = useAuth();
	const { getCountries } = useCountry();
	// Id du chat pour le stockage
	const [chatId, setChatId] = useState(null);
	// Titre du chat
	const [chatTitle, setChatTitle] = useState('Titre du chat');

	const getInfosForCountry = (options) => {
		// Recuperation du titre du chat
		const preferredCountry = getUser()?.prefered_country;
		const countries = getCountries();
		const preferredCountryData = countries.filter((elt) => {
			return elt.iso_code === preferredCountry;
		})[0];
		setChatId(preferredCountry || chatId);
		setChatTitle(preferredCountryData?.lib || chatTitle);
	};

	useEffect(() => {
		if (options?.type === 'country') {
			getInfosForCountry(options);
		} else if (options?.type === 'group') {
			setChatId(options?.id || chatId);
			setChatTitle(options?.title || chatTitle);
		}
	}, []);
	return (
		<SafeView style={styles.container}>
			<PageHeader
				text={chatTitle}
				displayBackButton={true}
				style={{
					marginLeft: 20,
					marginRight: 20,
				}}
				callBack={() => {
					resetRoomCount(
						options?.type === 'country'
							? getUser()?.prefered_country
							: options?.id
					);
				}}
			/>
			<MessageList
				chatId={chatId}
				style={{
					marginLeft: 20,
					marginRight: 20,
				}}
			/>
			<ReplyBox />
			<InputMessage chatId={chatId} />
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 0,
		gap: 10,
	},
});
