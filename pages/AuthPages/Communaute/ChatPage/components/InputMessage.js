import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react';
import { useAuth } from '../../../../../provider/AuthProvider';
import { sendMessage } from '../../../../../firebase_functions/chats/sendMessage';
import { useReply } from '../../../../../provider/ReplyProvider';

export default function InputMessage({ chatId = null }) {
	const { getUser } = useAuth();
	const { messageToReply, cancelReply } = useReply();
	const [message, setMessage] = useState('');
	const iosPaddingBehavior = Platform.OS === 'ios' ? 'padding' : undefined;
	const sendMessageBtnPressed = () => {
		sendMessage(
			chatId,
			message,
			getUser()?.uid,
			getUser()?.username,
			getUser()?.prefered_country,
			{ ...messageToReply }
		);
		setMessage('');
		cancelReply();
		Keyboard.dismiss();
	};
	return (
		<KeyboardAvoidingView
			behavior={iosPaddingBehavior}
			style={styles.container}
		>
			<View style={styles.inputView}>
				<TextInput
					value={message}
					onChangeText={setMessage}
					placeholder={''}
					multiline={true}
				/>
			</View>
			<TouchableOpacity style={styles.iconView} onPress={sendMessageBtnPressed}>
				<Feather name={'send'} size={20} color={'#48C543'} />
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#184D39',
		gap: 10,
		paddingLeft: 8,
		paddingRight: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputView: {
		flex: 1,
		backgroundColor: 'rgba(255,255,255,0.7)',
		borderRadius: 5,
		padding: 3,
		marginTop: 10,
		marginBottom: 10,
	},
	iconView: {
		padding: 8,
		backgroundColor: '#113427',
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
});
