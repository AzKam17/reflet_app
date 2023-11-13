import MatchDayTabItem from './MatchDayTabItem';
import { ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getMatchTabsList } from '../../../../firebase_functions/matchs/getMatchTabsList';

export default function MatchDayTabItemList({ onChange = () => {} }) {
	const [tabsList, setTabsList] = useState([]);
	const [selectedTab, setSelectedTab] = useState(null);

	useEffect(() => {
		getMatchTabsList().then((res) => {
			setTabsList(res);
			setSelectedTab(res[0]?.lib);
		});
	}, []);

	useEffect(() => {
		onChange(selectedTab);
	}, [selectedTab]);

	return (
		<ScrollView
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			bounces={false}
			style={styles.container}
		>
			{tabsList.map((el, idx) => {
				return (
					<MatchDayTabItem
						key={idx}
						date={el?.lib}
						isActive={el?.lib === selectedTab}
						onPress={() => setSelectedTab(el?.lib)}
					/>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 2,
	},
});
