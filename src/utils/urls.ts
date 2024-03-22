export const videoUrl = (videoId: string): string => `/watch?v=${videoId}`;

export const channelUrl = (channelId: string): string =>
	`/channel/${channelId}`;
