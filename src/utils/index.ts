export const abbreviateNumber = (value: number): string => {
	const suffixes = ["", "K", "M", "B", "T"];

	let suffixNum = 0;

	while (value >= 1000) {
		value /= 1000;
		suffixNum++;
	}

	return `${value.toPrecision(4)}${suffixes[suffixNum]}`;
};

export const formatNumber = (number: number) =>
	number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

export const toCamelCase = (string: string): string =>
	string
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (leftTrim: string, index: number) =>
			index === 0 ? leftTrim.toLowerCase() : leftTrim.toUpperCase()
		)
		.replace(/\s+/g, "");
