export const videoSize = (
	aspectRatio: [number, number],
	size: number
): [number, number] => {
	return [aspectRatio[0] * size, aspectRatio[1] * size];
};
