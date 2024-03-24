import { Author } from "./author";
import { Video } from "./video";

export type VideoItem = Video & { type: "video" };

export interface ChannelItem {
	type: "channel";
	name: string;
	id: string;
	thumbnail: string;
	subscribers: number;
	videos: number;
	description: string;
}

export interface PlaylistItem {
	type: "playlist";
	title: string;
	id: string;
	author: Author;
	numberOfVideos: number;
	thumbnail: string;
	videos?: {
		title: string;
		id: string;
		duration: number;
		thumbnail: string;
	}[];
}

export type Item = VideoItem | ChannelItem | PlaylistItem;
