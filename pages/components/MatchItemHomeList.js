import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { selectProchainMatchs } from '../../fixtures/MatchRepository';
import CupStepTitle from './CupStepTitle';
import MatchItem from './MatchItem';

export default function MatchItemHomeList() {
	const [data, setData] = useState([]);
	useEffect(() => {
		setData(selectProchainMatchs());
	}, []);
	return (
		<View>
			{data.map((el, idx) => {
				return (
					<View key={idx}>
						<CupStepTitle text={el?.step} />
						{el?.matchs.map((el1, idx1) => {
							return <MatchItem key={idx1} {...el1} />;
						})}
					</View>
				);
			})}
		</View>
	);
}
