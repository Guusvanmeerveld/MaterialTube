import {
	AdaptiveFormat,
	Caption,
	FormatStream,
	RecommendedVideo
} from "@interfaces/api/video";

export interface Video {
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
	};
	views: number;
	published: {
		time: Date;
		text: string;
	};
	length: number;
	live: boolean;
	premium: boolean;
}

export interface FullVideo extends Video {
	keywords: string[];
	likes: number;
	dislikes: number;
	familyFriendly: boolean;
	genre: {
		type: string;
		url: string;
	};
	author: {
		thumbnail: string;
		name: string;
		id: string;
		url: string;
	};
	subscriptions: string;
	rating: number;
	premiered: Date | undefined;
	recommendedVideos: RecommendedVideo[];
	adaptiveFormats: AdaptiveFormat[];
	formatStreams: FormatStream[];
	captions: Caption[];
}

export default Video;
