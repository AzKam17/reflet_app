import moment from 'moment';
import tempData from '../assets/TempData';

export const selectProchainMatchs = (data) => {
	const { matchs } = tempData;
	let temp = matchs.map((groupe) => ({
		...groupe,
		matchs: [groupe.matchs[0]], // Garde seulement le premier match dans un tableau
	}));

	return temp;
};

export const GetMatchs = (data) => {
	const { matchs } = tempData;

	return matchs;
};
