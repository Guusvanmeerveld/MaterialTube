const subCountRegex = /([0-9]{1,3}(?:\.[0-9]{1,2})?)([KMB])?/g;

const sizeMap: Record<string, number> = {
	K: 1.0e3,
	M: 1.0e6,
	B: 1.0e9
};

export const parseSubscriberCount = (subCount: string): number => {
	const matchIterator = subCount.matchAll(subCountRegex);

	const match = matchIterator.next().value;

	if (match) {
		const countFloat = parseFloat(match[1]);
		const size = sizeMap[match[2].toString().toUpperCase()] ?? 1;

		return countFloat * size;
	}

	return 5;
};
