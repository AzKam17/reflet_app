import { ScrollView } from 'react-native';
import ActualiteListItem from './ActualiteListItem';
import { useEffect, useState } from 'react';
import { getAllNews } from '../../../../firebase_functions/news/getAllNews';

export default function ActualiteList() {
	const numberOfItems = 10;
	const [news, setNews] = useState([]);

	useEffect(() => {
		getAllNews().then((res) => {
			setNews(res);
		});
	}, []);

	return (
		<ScrollView>
			{news.map((el, index) => {
				return <ActualiteListItem key={index} {...el} />;
			})}
		</ScrollView>
	);
}
