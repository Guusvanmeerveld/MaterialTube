const billion = 1.0e9;
const million = 1.0e6;
const thousand = 1.0e3;

const formatBigNumber = (num: number): string => {
	const abs = Math.abs(num);

	// Nine Zeroes for Billions
	if (abs >= billion) return (abs / billion).toPrecision(3) + "B";

	if (abs >= million) {
		if (abs >= million * 10) return (abs / million).toPrecision(3) + "M";

		return (abs / million).toPrecision(2) + "M";
	}

	if (abs >= thousand) {
		if (abs >= thousand * 10) return (abs / thousand).toPrecision(3) + "K";

		return (abs / thousand).toPrecision(2) + "K";
	}

	return abs.toString();
};

export default formatBigNumber;
