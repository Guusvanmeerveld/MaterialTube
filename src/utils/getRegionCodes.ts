import { allCountries } from "country-region-data";

export interface Region {
	code: string;
	name: string;
}

const getRegionCodes = (): Region[] =>
	allCountries.map((country) => ({
		name: country[0],
		code: country[1]
	}));

export default getRegionCodes;
