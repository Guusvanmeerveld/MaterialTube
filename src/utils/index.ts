export const abbreviateNumber = (value: number): string => {
	const suffixes = ["", "K", "M", "B", "T"];

	let suffixNum = 0;

	while (value >= 1000) {
		value /= 1000;
		suffixNum++;
	}

	value = parseInt(value.toPrecision(3));

	return `${value}${suffixes[suffixNum]}`;
};
