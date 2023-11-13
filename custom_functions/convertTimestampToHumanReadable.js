export function convertTimestampToHumanReadable(unixTimestamp) {
	const now = new Date().getTime();
	const timestampInMilliseconds = unixTimestamp * 1000; // Convertir les secondes en millisecondes
	const diff = now - timestampInMilliseconds;

	if (diff < 60 * 60 * 1000) {
		// Si la différence est inférieure à 1 heure, renvoyer les minutes
		const minutes = Math.max(1, Math.floor(diff / (60 * 1000))); // Utilise Math.max pour s'assurer que c'est au moins 1 minute
		return minutes + (minutes === 1 ? ' min.' : ' min.');
	} else if (diff < 24 * 60 * 60 * 1000) {
		// Si la différence est inférieure à 1 jour, renvoyer les heures
		const hours = Math.floor(diff / (60 * 60 * 1000));
		return hours + (hours === 1 ? ' h' : ' h');
	} else {
		// Sinon, renvoyer la date au format "31/09"
		const date = new Date(timestampInMilliseconds);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		return day + '/' + month;
	}
}
