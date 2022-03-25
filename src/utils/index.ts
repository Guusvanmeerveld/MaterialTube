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

export const toCamelCase = (string: string): string =>
	string
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (leftTrim: string, index: number) =>
			index === 0 ? leftTrim.toLowerCase() : leftTrim.toUpperCase()
		)
		.replace(/\s+/g, "");
