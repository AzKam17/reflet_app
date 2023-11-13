import { createContext, useContext, useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';

export const ReplyContext = createContext();

export const ReplyProvider = ({ children }) => {
	const [messageToReply, setMessageToReply] = useState(null);
	const [isReplying, setIsReplying] = useState(false);

	useEffect(() => {
		console.log('[Replying to] ' + JSON.stringify(messageToReply));
		setIsReplying(messageToReply !== null);
	}, [messageToReply]);

	const cancelReply = () => {
		setMessageToReply(null);
	};

	return (
		<ReplyContext.Provider
			value={{ messageToReply, setMessageToReply, cancelReply, isReplying }}
		>
			{children}
		</ReplyContext.Provider>
	);
};

export function useReply() {
	return useContext(ReplyContext);
}
