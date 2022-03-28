import { Thumbnail } from "@interfaces/api";

interface Video {
	thumbnail: string;
	title: string;
	description: {
		text: string;
		html: string;
	};
	id: string;
	author: {
		name: string;
		id: string;
		url: string;
		thumbnail?: string;
	};
	views: number;
	published: {
		time: Date;
		text: string;
	};
	length: number;
	live: boolean;
	premium: boolean;
	keywords?: string[];
	likes?: number;
	dislikes?: number;
	familyFriendly?: boolean;
	genre?: {
		type: string;
		url: string;
	};
	subscriptions?: string;
	rating?: number;
	upcoming?: boolean;
	premiereTimestamp?: number;
	premiered?: Date;
	recommendedVideos?: RecommendedVideo[];
	adaptiveFormats?: AdaptiveFormat[];
	formatStreams?: FormatStream[];
	captions?: Caption[];
}

export interface RecommendedVideo {
	videoId: string;
	title: string;
	videoThumbnails: Thumbnail[];
	author: string;
	authorUrl: string;
	authorId: string;
	lengthSeconds: number;
	viewCountText: string;
	viewCount: number;
}

export interface Caption {
	label: string;
	language_code: string;
	url: string;
}

enum ProjectionType {
	Rectangular = "RECTANGULAR"
}

export interface AdaptiveFormat {
	index: string;
	bitrate: string;
	init: string;
	url: string;
	itag: string;
	type: string;
	clen: string;
	lmt: string;
	projectionType: ProjectionType;
	fps?: number;
	container?: Container;
	encoding?: string;
	resolution?: string;
	qualityLabel?: string;
}

export interface FormatStream {
	url: string;
	itag: string;
	type: string;
	quality: string;
	fps: number;
	container: string;
	encoding: string;
	resolution: string;
	qualityLabel: string;
	size: string;
}

enum Container {
	M4A = "m4a",
	Mp4 = "mp4",
	Webm = "webm"
}

export default Video;
