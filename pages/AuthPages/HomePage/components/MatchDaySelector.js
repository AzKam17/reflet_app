import MatchDayTabItemList from './MatchDayTabItemList';
import MatchItemList from './MatchItemList';
import { useEffect, useState } from 'react';

export default function MatchDaySelector() {
	const [actualDay, setActualDay] = useState(null);

	return (
		<>
			<MatchDayTabItemList onChange={setActualDay} />
			<MatchItemList actualDay={actualDay} />
		</>
	);
}
