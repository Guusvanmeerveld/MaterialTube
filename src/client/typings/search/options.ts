export interface SearchOptions {
	pageParam?: string;
	type?: SearchType;
}

export type SearchType = "video" | "playlist" | "channel" | "all";
