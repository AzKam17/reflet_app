import {
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import SendedMessage from './SendedMessage';
import ReceivedMessage from './ReceivedMessage';
import { useEffect, useRef, useState } from 'react';
import { subscribeToMessagesByGroup } from '../../../../../firebase_functions/chats/subscribeToMessagesByGroup';
import { useAuth } from '../../../../../provider/AuthProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { bold, regular } from '../../../../../FontsConfig';

export default function MessageList({ chatId = null, style = {} }) {
	const { getUser } = useAuth();
	const [roomID, setRoomID] = useState(chatId);
	const [userId, setUserId] = useState(null);
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const scrollViewRef = useRef(null);
	const [isAtEnd, setIsAtEnd] = useState(false);

	const scrollScrollViewToEnd = () => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollToEnd({ animated: true });
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			const unsubscribe = subscribeToMessagesByGroup(chatId, (messages) => {
				setMessages(messages);
				setLoading(false);
			});

			return () => {
				unsubscribe();
			};
		}, 5);

		return () => {
			clearTimeout(timer);
		};
	}, [chatId]);

	useEffect(() => {
		setUserId(getUser()?.uid);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (scrollViewRef) {
				if (scrollViewRef.current) {
					scrollViewRef.current.scrollToEnd({ animated: false });
				}
			}
		}, 100);
		return () => {
			clearTimeout(timer);
		};
	}, [scrollViewRef]);

	return (
		<View
			style={[
				{
					flex: 1,
				},
				style,
			]}
		>
			<ScrollView
				ref={scrollViewRef}
				scrollEventThrottle={10}
				onScroll={(event) => {
					const offsetY = event.nativeEvent.contentOffset.y;
					const contentHeight = event.nativeEvent.contentSize.height;
					const layoutHeight = event.nativeEvent.layoutMeasurement.height;
					const isAtEnd = offsetY >= contentHeight - layoutHeight;
					setIsAtEnd(isAtEnd);
				}}
				onContentSizeChange={() => {
					scrollViewRef.current.scrollToEnd({ animated: false });
				}}
			>
				{loading ? (
					<></>
				) : (
					messages.map((el, index) => {
						const props = {
							key: index,
							id: el?.id,
							sender: el?.userName,
							text: el?.message,
							time: el?.sendedAt?.seconds,
							reply: el?.reply_message || null,
							prefered_country: el?.prefered_country || null,
						};
						return userId === el?.uid ? (
							<SendedMessage {...props} />
						) : (
							<ReceivedMessage {...props} />
						);
					})
				)}
			</ScrollView>
			{!isAtEnd && (
				<TouchableOpacity
					onPress={scrollScrollViewToEnd}
					style={{
						padding: 5,
						backgroundColor: 'white',
						position: 'absolute',
						bottom: 5,
						right: 5,
						borderRadius: 10,
						borderColor: 'white',
						borderWidth: 1,
					}}
				>
					<AntDesign name={'downcircleo'} color={'#113427'} size={20} />
				</TouchableOpacity>
			)}
		</View>
	);
}
