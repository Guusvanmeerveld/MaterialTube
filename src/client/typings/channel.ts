import { Author } from "./author";

export interface Channel extends Author {
	id: string;
	subscribers: number;
	description: string;
	avatar: string;
	banner?: string;
}
