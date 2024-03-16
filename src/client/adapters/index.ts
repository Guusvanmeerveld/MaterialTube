import { Suggestions } from "@/client/typings/search/suggestions";
import { Video } from "@/client/typings/video";
import { SearchResults } from "@/client/typings/search";
import { SearchOptions } from "@/client/typings/search/options";

export interface ConnectedAdapter {
	getTrending(region: string): Promise<Video[]>;

	getSearchSuggestions(query: string): Promise<Suggestions>;
	getSearch(query: string, options?: SearchOptions): Promise<SearchResults>;
}

export default interface Adapter {
	apiType: ApiType;

	connect(url: string): ConnectedAdapter;
}

export enum ApiType {
	Piped,
	Invidious
}
