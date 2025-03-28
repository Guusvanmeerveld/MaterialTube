export const videoSize = (
	size: number,
	aspectRatio: [number, number] = [16, 9]
): [number, number] => [aspectRatio[0] * size, aspectRatio[1] * size];
