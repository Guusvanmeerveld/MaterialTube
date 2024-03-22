import { Item } from "../item";

export interface SearchResults {
	items: Item[];
	nextCursor: string;
}
