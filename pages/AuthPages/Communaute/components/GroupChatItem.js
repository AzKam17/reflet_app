import { Text, StyleSheet, View, Pressable } from 'react-native';
import { bold, regular, semibold } from '../../../../FontsConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { listenLastGroupData } from '../../../../firebase_functions/chats/group/listenLastGroupData';
import { convertTimestampToHumanReadable } from '../../../../custom_functions/convertTimestampToHumanReadable';
import { countUniqueUserIdsInGroupMessages } from '../../../../firebase_functions/chats/countUniqueUserIdsInGroupMessages';
import { useChat } from '../../../../provider/ChatProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function GroupChatItem(props) {
	const navigation = useNavigation();
	const { tabsCount, incrementRoomNonRead, addNewRoomName } = useChat();
	const usedProps = { ...props };
	const [lastMessage, setLastMessage] = useState({});
	const [loading, setLoading] = useState(true);
	const [numberOfChanges, setNumberOfChanges] = useState(0);
	const [uniqueUsersCount, setUniqueUsersCount] = useState(0);

	useEffect(() => {
		const unsubscribe = listenLastGroupData(usedProps?.id, (lastMessage) => {
			if (lastMessage) {
				setLastMessage(lastMessage);
			} else {
				console.log('Aucun message trouvé pour ce groupe.');
			}
			setLoading(false); // Marquez le chargement comme terminé
		});

		// Appel de la fonction pour compter les utilisateurs uniques dans le groupe
		countUniqueUsers();

		return () => {
			// Nettoyez en vous désabonnant lorsque le composant est démonté
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		incrementRoomNonRead(usedProps.id || usedProps?.chatPageOptions?.iso_code);
	}, [lastMessage]);

	useEffect(() => {
		setNumberOfChanges(0);
		addNewRoomName(usedProps.id, usedProps?.title);
	}, []);

	// Fonction pour compter les utilisateurs uniques dans le groupe
	const countUniqueUsers = async () => {
		const groupId = usedProps.id;
		const count = await countUniqueUserIdsInGroupMessages(groupId);
		setUniqueUsersCount(count);
	};

	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				setNumberOfChanges(0);
				navigation.navigate('ChatPage', usedProps?.chatPageOptions);
			}}
		>
			<View style={styles.firstContainer}>
				<View style={styles.icon}>
					<AntDesign name={'message1'} color={'black'} size={18} />
				</View>
				<View style={styles.infosContainer}>
					<Text style={styles.chatTitle}>{usedProps?.title}</Text>
					<View
						style={{
							gap: 10,
							flexDirection: 'row',
						}}
					>
						<Text style={styles.lastMessage}>{lastMessage?.message}</Text>
						{tabsCount[usedProps.id] > 0 && (
							<View
								style={{
									paddingRight: 2,
									paddingLeft: 2,
									backgroundColor: '#184D39',
									borderRadius: 10,
								}}
							>
								<Text
									style={[
										styles.lastMessage,
										{
											color: 'white',
											fontFamily: bold,
										},
									]}
								>
									+{tabsCount[usedProps.id]}
								</Text>
							</View>
						)}
					</View>
				</View>
			</View>
			<View style={styles.chatsStats}>
				<View style={styles.countContainer}>
					{!loading && (
						<>
							<Text style={styles.count}>{uniqueUsersCount}</Text>
							<Ionicons name={'people'} color={'black'} size={13} />
						</>
					)}
				</View>
				<Text style={[styles.lastMessage, styles.lastMessageTime]}>
					{loading
						? 'Chargement...'
						: convertTimestampToHumanReadable(lastMessage?.sendedAt?.seconds)}
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexDirection: 'row',
		padding: 10,
		borderRadius: 5,
		gap: 10,
		justifyContent: 'space-between',
	},
	firstContainer: {
		flex: 1,
		gap: 10,
		flexDirection: 'row',
	},
	icon: {
		height: 50,
		width: 50,
		borderRadius: 100,
		backgroundColor: '#d9d9d9',
		justifyContent: 'center',
		alignItems: 'center',
	},
	infosContainer: {
		justifyContent: 'center',
	},
	chatTitle: {
		fontFamily: bold,
		color: 'black',
	},
	lastMessage: {
		fontFamily: regular,
		color: 'rgba(0,0,0,0.7)',
	},
	chatsStats: {
		justifyContent: 'center',
	},
	count: {
		fontFamily: bold,
		color: 'rgba(0,0,0,0.6)',
		textAlign: 'right',
	},
	countContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: 5,
	},
	lastMessageTime: {
		textAlign: 'right',
	},
});
