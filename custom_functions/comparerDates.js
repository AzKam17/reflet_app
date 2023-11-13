const { parse } = require('date-fns');

export function comparerDates(date1, date2) {
	function parseCustomDate(dateStr) {
		const [, jour, numeroMois] = /(\w+) (\d+) (\w+)/.exec(dateStr);
		const moisEnTexte = numeroMoisEnTexte(numeroMois);
		return parse(`${jour} ${moisEnTexte}`, 'cccc d LLLL', new Date());
	}

	function numeroMoisEnTexte(numeroMois) {
		const moisEnTexte = [
			'Janvier',
			'Février',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juillet',
			'Août',
			'Septembre',
			'Octobre',
			'Novembre',
			'Décembre',
		];
		return moisEnTexte[numeroMois - 1];
	}

	const date1Obj = parseCustomDate(date1);
	const date2Obj = parseCustomDate(date2);

	return date1Obj > date2Obj;
}

export function sortDatesInAscendingOrder(dates) {
	return Array.from(new Set(dates)).sort((date1, date2) => {
		if (comparerDates(date1, date2)) {
			return 1;
		} else if (comparerDates(date2, date1)) {
			return -1;
		} else {
			return 0;
		}
	});
}

export function summarizeDate(dateStr) {
	const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

	// Utilisez une expression régulière pour extraire le jour, le numéro du jour et le mois
	const match = /(\w{3})\w* (\d+) (\w+)/.exec(dateStr);

	if (match) {
		const [, jour, numero, mois] = match;
		// Obtenez l'index du jour dans le tableau "jours"
		const indexJour = jours.indexOf(jour);
		// Formate la date résumée
		return `${jours[indexJour]}.\n${numero}`;
	} else {
		// En cas de correspondance incorrecte, retournez la date d'origine
		return dateStr;
	}
}
