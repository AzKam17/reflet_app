import { createContext, useContext, useEffect, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
	const [tabsCount, setTabsCount] = useState({});
	const [roomsName, setRoomsNames] = useState({});

	const incrementRoomNonRead = (id) => {
		let actualCount = tabsCount[id] || 0;
		console.log({ ...tabsCount, [id]: actualCount++ });
		setTabsCount({ ...tabsCount, [id]: actualCount++ });
	};

	const resetRoomCount = (id) => {
		setTabsCount({ ...tabsCount, [id]: 0 });
	};

	const addNewRoomName = (roomKey, roomName) => {
		setRoomsNames({ ...roomsName, [roomKey]: roomName });
	};

	useEffect(() => {
		console.log(roomsName);
	}, [roomsName]);

	return (
		<ChatContext.Provider
			value={{
				tabsCount,
				incrementRoomNonRead,
				resetRoomCount,
				addNewRoomName,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export function useChat() {
	return useContext(ChatContext);
}
