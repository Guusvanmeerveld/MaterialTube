import { Channel } from "@/client/typings/channel";
import { Comments } from "@/client/typings/comment";
import { SearchResults } from "@/client/typings/search";
import { SearchOptions } from "@/client/typings/search/options";
import { Suggestions } from "@/client/typings/search/suggestions";
import { Video } from "@/client/typings/video";
import { Watchable } from "@/client/typings/watchable";

export interface ConnectedAdapter {
	getTrending(region: string): Promise<Video[]>;

	getSearchSuggestions(query: string): Promise<Suggestions>;
	getSearch(query: string, options?: SearchOptions): Promise<SearchResults>;

	getWatchable(videoId: string): Promise<Watchable>;

	getComments(videoId: string, repliesToken?: string): Promise<Comments>;

	getChannel(channelId: string): Promise<Channel>;
}

export default interface Adapter {
	apiType: ApiType;

	connect(url: string): ConnectedAdapter;
}

export enum ApiType {
	Piped,
	Invidious
}
