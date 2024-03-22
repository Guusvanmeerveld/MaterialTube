import { SearchResults } from "@/client/typings/search";
import { SearchOptions } from "@/client/typings/search/options";
import { Suggestions } from "@/client/typings/search/suggestions";
import { Stream } from "@/client/typings/stream";
import { Video } from "@/client/typings/video";

export interface ConnectedAdapter {
	getTrending(region: string): Promise<Video[]>;

	getSearchSuggestions(query: string): Promise<Suggestions>;
	getSearch(query: string, options?: SearchOptions): Promise<SearchResults>;

	getStream(videoId: string): Promise<Stream>;
}

export default interface Adapter {
	apiType: ApiType;

	connect(url: string): ConnectedAdapter;
}

export enum ApiType {
	Piped,
	Invidious
}
