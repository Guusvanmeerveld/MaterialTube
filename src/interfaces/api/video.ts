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

enum ProjectionType {
	Rectangular = "RECTANGULAR"
}

interface Thumbnail {
	url: string;
	width: number;
	height: number;
	quality?: Quality;
}

enum Quality {
	Default = "default",
	End = "end",
	High = "high",
	Maxres = "maxres",
	Maxresdefault = "maxresdefault",
	Medium = "medium",
	Middle = "middle",
	Sddefault = "sddefault",
	Start = "start"
}

export interface Caption {
	label: string;
	language_code: string;
	url: string;
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
