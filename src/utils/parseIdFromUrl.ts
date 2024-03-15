const videoIdRegex = /\/watch\?v=(.+)/;

export const parseVideoIdFromUrl = (url: string): string | null => {
	const videoIdMatch = url.match(videoIdRegex);

	const videoId = videoIdMatch !== null ? videoIdMatch[1] : null;

	return videoId;
};

const channelIdRegex = /\/channel\/(.+)/;

export const parseChannelIdFromUrl = (url: string): string | null => {
	const channelIdMatch = url.match(channelIdRegex);

	const channelId = channelIdMatch !== null ? channelIdMatch[1] : null;

	return channelId;
};
