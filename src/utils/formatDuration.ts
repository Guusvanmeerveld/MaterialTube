import { Duration } from "luxon";

const formatDuration = (ms: number): string => {
	if (ms / (60 * 60 * 1000) >= 1)
		return Duration.fromMillis(ms).toFormat("HH:mm:ss");
	else return Duration.fromMillis(ms).toFormat("mm:ss");
};

export default formatDuration;
