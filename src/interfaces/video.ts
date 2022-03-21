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
		time: number;
		text: string;
	};
	length: number;
}

export interface Trending {
	type: string;
	title: string;
	videoId: string;
	author: string;
	authorId: string;
	authorUrl: string;
	videoThumbnails: VideoThumbnail[];
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

interface VideoThumbnail {
	quality: string;
	url: string;
	width: number;
	height: number;
}
