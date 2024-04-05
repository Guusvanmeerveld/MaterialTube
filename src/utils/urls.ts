import path from "path";

import { youtubeUrl } from "@/constants";

export const videoUrl = (videoId: string): string => `/watch?v=${videoId}`;

export const channelUrl = (channelId: string): string =>
	`/channel/${channelId}`;

export const youtubeVideoUrl = (videoId: string): URL => {
	const url = new URL("watch", youtubeUrl);

	url.searchParams.append("v", videoId);

	return url;
};

export const youtubeChannelUrl = (channelId: string): URL => {
	return new URL(path.join("channel", channelId), youtubeUrl);
};
