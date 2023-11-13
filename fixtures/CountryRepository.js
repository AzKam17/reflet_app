import tempData from '../assets/TempData';

export const GetCountries = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(tempData.countries);
		}, 0);
	});
};

export const GetCountry = (id) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(tempData.countries[id]);
		}, 0);
	});
};

export const GetCountryBySlug = (slug) => {
	const country = tempData.countries.find((c) => c.slug === slug);
	if (country) {
		return country;
	} else {
		throw Error('Pays Introuvable - Pas de pays avec cet slug ' + slug);
	}
};

export const GetCountryByIsoCode = (iso_code) => {
	const country = tempData.countries.find((c) => c.iso_code === iso_code);
	if (country) {
		return country;
	} else {
		throw Error('Pays Introuvable - Pas de pays avec cet iso_code ' + slug);
	}
};
