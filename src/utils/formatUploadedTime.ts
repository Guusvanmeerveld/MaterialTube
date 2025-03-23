import { DateTime } from "luxon";

const formatUploadedTime = (uploaded: Date): string =>
	DateTime.fromJSDate(uploaded).toRelative() ?? "Unknown time";

export default formatUploadedTime;
