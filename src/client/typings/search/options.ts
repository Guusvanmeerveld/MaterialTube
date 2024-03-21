import z from "zod";

export interface SearchOptions {
	pageParam?: string;
	type?: SearchType;
}

export const searchTypes = ["video", "playlist", "channel", "all"] as const;

export const SearchTypeModel = z.enum(searchTypes);

export type SearchType = z.infer<typeof SearchTypeModel>;
