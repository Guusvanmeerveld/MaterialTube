import { Video } from "../video";

export type VideoResult = Video & { type: "video" };

export interface ChannelResult {
	type: "channel";
	name: string;
	id: string;
	thumbnail: string;
	subscribers: number;
	videos: number;
	description: string;
}

export interface PlaylistResult {
	type: "playlist";
	title: string;
	id: string;
	author: {
		name: string;
		id: string;
	};
	numberOfVideos: number;
	thumbnail: string;
	videos?: {
		title: string;
		id: string;
		duration: number;
		thumbnail: string;
	}[];
}

export type SearchResults = (VideoResult | ChannelResult | PlaylistResult)[];
