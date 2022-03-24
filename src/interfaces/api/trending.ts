interface Trending {
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

export default Trending;
