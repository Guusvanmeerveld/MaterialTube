import { DateTime } from "luxon";

const formatUploadedTime = (uploaded: Date): string => {
	return DateTime.fromJSDate(uploaded).toRelative() ?? "";
};

export default formatUploadedTime;
