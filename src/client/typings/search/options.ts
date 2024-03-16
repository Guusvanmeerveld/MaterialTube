export interface SearchOptions {
	page?: number;
	type?: SearchType;
}

export type SearchType = "video" | "playlist" | "channel" | "all";
