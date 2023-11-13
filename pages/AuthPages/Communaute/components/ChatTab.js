import TabChatItemList from './TabChatItemList';
import GroupChatItemList from './GroupChatItemList';
import { useEffect, useState } from 'react';

export default function ChatTab() {
	const [selectedTab, setSelectedTab] = useState(null);

	return (
		<>
			<TabChatItemList onSelectedTabChange={setSelectedTab} />
			<GroupChatItemList selectedTab={selectedTab} />
		</>
	);
}
