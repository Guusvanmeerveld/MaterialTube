const formatViewCount = (num: number): string => {
	// Nine Zeroes for Billions
	return Math.abs(num) >= 1.0e9
		? (Math.abs(num) / 1.0e9).toPrecision(3) + "B"
		: // Six Zeroes for Millions
		Math.abs(num) >= 1.0e6
		? (Math.abs(num) / 1.0e6).toPrecision(3) + "M"
		: // Three Zeroes for Thousands
		Math.abs(num) >= 1.0e3
		? (Math.abs(num) / 1.0e3).toPrecision(3) + "K"
		: Math.abs(num).toString();
};

export default formatViewCount;
