import { DateTime, Duration } from "luxon";

export const parseRelativeTime = (text: string): DateTime => {
	const parts = text.split(" ");

	const value = parseInt(parts[0]);
	const unit = parts[1];

	let duration: Duration;

	if (["second", "seconds"].includes(unit)) {
		duration = Duration.fromObject({ seconds: value });
	} else if (["minute", "minutes"].includes(unit)) {
		duration = Duration.fromObject({ minutes: value });
	} else if (["hour", "hours"].includes(unit)) {
		duration = Duration.fromObject({ hours: value });
	} else if (["day", "days"].includes(unit)) {
		duration = Duration.fromObject({ days: value });
	} else if (["week", "weeks"].includes(unit)) {
		duration = Duration.fromObject({ weeks: value });
	} else if (["month", "months"].includes(unit)) {
		duration = Duration.fromObject({ months: value });
	} else if (["year", "years"].includes(unit)) {
		duration = Duration.fromObject({ years: value });
	} else {
		throw new Error(`Unknown time unit '${unit}'`);
	}

	const resultDate = DateTime.now().minus(duration);

	return resultDate;
};
