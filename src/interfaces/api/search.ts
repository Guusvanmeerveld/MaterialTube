import { Thumbnail } from "@interfaces/api";
import VideoTrending from "@interfaces/api/trending";

interface Results {
	type: Type;
}

export interface ChannelResult extends Results {
	type: "channel";
	author: string;
	authorId: string;
	authorUrl: string;
	authorThumbnails: Thumbnail[];
	subCount: number;
	videoCount: number;
	description: string;
	descriptionHtml: string;
}

export interface VideoResult extends Results {
	type: "video";
	title: string;
	author: string;
	authorId: string;
	authorUrl: string;
	description: string;
	descriptionHtml: string;
	videoId: string;
	videoThumbnails: Thumbnail[];
	viewCount: number;
	published: number;
	publishedText: string;
	lengthSeconds: number;
	liveNow: boolean;
	premium: boolean;
}

export interface PlaylistResult extends Results {
	type: "playlist";
	title: string;
	playlistId: string;
	author: string;
	authorId: string;
	authorUrl: string;
	videoCount: number;
	videos: Video[];
}

export interface CategoryResult extends Results {
	type: "category";
	title: string;
	contents: VideoTrending[];
}

export interface Content {
	type: Type;
	title: string;
	videoId: string;
	author: string;
	authorId: string;
	authorUrl: string;
	videoThumbnails: Thumbnail[];
	description: string;
	descriptionHtml: string;
	viewCount: number;
	published: number;
	publishedText: string;
	lengthSeconds: number;
	liveNow: boolean;
	premium: boolean;
	isUpcoming: boolean;
}

export type Type = "category" | "channel" | "playlist" | "video";

export interface Video {
	title: string;
	videoId: string;
	lengthSeconds: number;
	videoThumbnails: Thumbnail[];
}

export default Results;
