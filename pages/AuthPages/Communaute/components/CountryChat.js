import GroupChatItem from './GroupChatItem';
import { useAuth } from '../../../../provider/AuthProvider';
import { useCountry } from '../../../../provider/CountryProvider';
import { useEffect, useState } from 'react';
import { listenLastGroupData } from '../../../../firebase_functions/chats/group/listenLastGroupData';
import { convertTimestampToHumanReadable } from '../../../../custom_functions/convertTimestampToHumanReadable';
import { GetCountryBySlug } from '../../../../fixtures/CountryRepository';

export default function CountryChat() {
	const { getUser } = useAuth();
	const { getCountries } = useCountry();

	const [chatName, setChatName] = useState('Chat de votre pays.');
	const [lastMessage, setLastMessage] = useState({});

	// Fonction de récupération du titre du chat
	useEffect(() => {
		const preferredCountry = getUser()?.prefered_country;
		const preferredCountryData = GetCountryBySlug(preferredCountry);
		setChatName(preferredCountryData?.lib || chatName);
	}, []);

	return (
		<GroupChatItem
			id={getUser()?.prefered_country}
			type={'country'}
			title={chatName}
			lastMessage={lastMessage?.message}
			chatPageOptions={{
				type: 'country',
				iso_code: getUser()?.prefered_country,
			}}
			time={convertTimestampToHumanReadable(lastMessage?.sendedAt?.seconds)}
		/>
	);
}
