import { Thumbnail } from "./thumbnail";

export interface TrendingVideo {
	title: string;
	thumbnails: Thumbnail[];
	id: string;
	author: {
		name: string;
		id: string;
	};
	/*
		Duration in milliseconds.
	*/
	duration: number;
	views: number;
	uploaded: Date;
}
