import { ActivityIndicator, StyleSheet, View } from 'react-native';
import GroupChatItem from './GroupChatItem';
import { useEffect, useState } from 'react';
import { getTabsInGroup } from '../../../../firebase_functions/chats/getTabsInGroup';

export default function GroupChatItemList({ selectedTab }) {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTabs = async () => {
			try {
				const res = await getTabsInGroup(selectedTab);
				setItems(res);
				setLoading(false);
			} catch (error) {
				console.error(
					'Erreur lors de la récupération des onglets de discussion :',
					error
				);
				setLoading(false);
			}
		};

		// Appel de la fonction asynchrone
		fetchTabs();
	}, [selectedTab]);

	if (loading) {
		return <ActivityIndicator />;
	}

	return (
		<View style={styles.container}>
			{items.map((el, index) => (
				<GroupChatItem
					key={el?.id}
					title={el?.lib}
					id={el?.id}
					chatPageOptions={{
						type: 'group',
						title: el?.lib,
						id: el?.id,
					}}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 5,
	},
});
