import { Thumbnail } from "@interfaces/api";
import {
	AdaptiveFormat,
	Caption,
	FormatStream,
	RecommendedVideo
} from "@interfaces/video";

export interface Video {
	type: string;
	title: string;
	videoId: string;
	videoThumbnails: Thumbnail[];
	storyboards: Storyboard[];
	description: string;
	descriptionHtml: string;
	published: number;
	publishedText: string;
	keywords: string[];
	viewCount: number;
	likeCount: number;
	dislikeCount: number;
	paid: boolean;
	premium: boolean;
	isFamilyFriendly: boolean;
	allowedRegions: string[];
	premiereTimestamp?: number;
	genre: string;
	genreUrl: string;
	author: string;
	authorId: string;
	authorUrl: string;
	authorThumbnails: Thumbnail[];
	subCountText: string;
	lengthSeconds: number;
	allowRatings: boolean;
	rating: number;
	isListed: boolean;
	liveNow: boolean;
	isUpcoming: boolean;
	dashUrl: string;
	adaptiveFormats: AdaptiveFormat[];
	formatStreams: FormatStream[];
	captions: Caption[];
	recommendedVideos: RecommendedVideo[];
}

interface Storyboard {
	url: string;
	templateUrl: string;
	width: number;
	height: number;
	count: number;
	interval: number;
	storyboardWidth: number;
	storyboardHeight: number;
	storyboardCount: number;
}

export default Video;
