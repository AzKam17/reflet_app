import { View } from 'react-native';
import CommentItem from './CommentItem';

export default function CommentItemList() {
	const numberOfItems = 10;
	return (
		<View>
			{[...Array(numberOfItems).keys()].map((index) => {
				return <CommentItem key={index} />;
			})}
		</View>
	);
}
