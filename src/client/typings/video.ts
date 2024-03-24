import { Author } from "./author";

export interface Video {
	title: string;
	id: string;
	author: Author;
	thumbnail: string;
	description?: string;
	/*
		Duration in milliseconds.
	*/
	duration: number;
	views: number;
	uploaded?: Date;
	live: boolean;
}
