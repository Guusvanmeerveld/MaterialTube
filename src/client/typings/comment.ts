import { Author } from "./author";

export interface Comment {
	id: string;
	message: string;
	likes: number;
	edited: boolean;

	written: Date;

	author: Author;

	pinned: boolean;
	videoUploaderLiked: boolean;
	videoUploaderReplied: boolean;

	repliesToken?: string;
}

export interface Comments {
	enabled: boolean;
	count?: number;
	data: Comment[];
}
