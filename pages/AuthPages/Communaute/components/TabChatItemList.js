import { ActivityIndicator, StyleSheet, View } from 'react-native';
import TabChatItem from './TabChatItem';
import { useEffect, useState } from 'react';
import { getAllChatsTabs } from '../../../../firebase_functions/chats/getAllChatsTabs';

export default function TabChatItemList({ onSelectedTabChange = () => {} }) {
	const [tabs, setTabs] = useState([]);
	const [selectedTab, setSelectedTab] = useState(null);
	useEffect(() => {
		getAllChatsTabs().then((res) => {
			setTabs(res);
			setSelectedTab(res[0]?.id);
		});
	}, []);

	useEffect(() => {
		onSelectedTabChange(selectedTab);
	}, [selectedTab]);

	if (tabs.length === 0) {
		return (
			<View>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{tabs.map((el, index) => {
				return (
					<TabChatItem
						key={el?.id}
						title={el?.lib}
						onPress={() => setSelectedTab(el?.id)}
						isActive={el?.id === selectedTab}
					/>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
});
