import { Suggestions } from "@/client/typings/search/suggestions";
import { TrendingVideo } from "@/client/typings/trending";

export interface ConnectedAdapter {
	getTrending(region: string): Promise<TrendingVideo[]>;

	getSearchSuggestions(query: string): Promise<Suggestions>;
}

export default interface Adapter {
	apiType: ApiType;

	connect(url: string): ConnectedAdapter;
}

export enum ApiType {
	Piped,
	Invidious
}
