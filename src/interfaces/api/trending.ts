import { Thumbnail } from "@interfaces/api";

interface Trending {
	type: string;
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
	premiereTimestamp?: number;
}

export default Trending;
