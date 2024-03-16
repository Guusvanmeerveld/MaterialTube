import ky from "ky";

import Video, { VideoModel } from "./typings/video";
import Suggestions, { SuggestionsModel } from "./typings/search/suggestions";

import Adapter, { ApiType } from "@/client/adapters";

import Transformer from "./transformer";

import path from "path";
import Search, { SearchModel } from "./typings/search";

const apiPath = (...paths: string[]): string =>
	path.join("api", "v1", ...paths);

export type TrendingVideoType = "music" | "gaming" | "news" | "movies";

const getTrending = async (
	baseUrl: string,
	region?: string,
	type?: TrendingVideoType
): Promise<Video[]> => {
	const url = new URL(apiPath("trending"), baseUrl);

	const searchParams = new URLSearchParams();

	if (region !== undefined) searchParams.append("region", region);

	if (type !== undefined) searchParams.append("type", type);

	const response = await ky.get(url, {
		searchParams
	});

	const json = await response.json();

	const data = VideoModel.array().parse(json);

	return data;
};

const getSearchSuggestions = async (
	baseUrl: string,
	query: string
): Promise<Suggestions> => {
	const url = new URL(apiPath("search", "suggestions"), baseUrl);

	const response = await ky.get(url, {
		searchParams: { q: query }
	});

	const json = await response.json();

	const data = SuggestionsModel.parse(json);

	return data;
};

export interface SearchOptions {
	page?: number;
	sort_by?: "relevance" | "rating" | "upload_date" | "view_count";
	date?: "hour" | "today" | "week" | "month" | "year";
	duration?: "short" | "long" | "medium";
	type?: "video" | "playlist" | "channel" | "movie" | "show" | "all";
	region?: string;
}

const getSearch = async (
	baseUrl: string,
	query: string,
	options?: SearchOptions
): Promise<Search> => {
	const url = new URL(apiPath("search"), baseUrl);

	const response = await ky.get(url, {
		searchParams: { ...options, q: query }
	});

	const json = await response.json();

	const data = SearchModel.parse(json);

	return data;
};

const adapter: Adapter = {
	apiType: ApiType.Invidious,

	connect(url) {
		return {
			async getTrending(region) {
				return getTrending(url, region).then(Transformer.videos);
			},

			async getSearchSuggestions(query) {
				return getSearchSuggestions(url, query).then(Transformer.suggestions);
			},
			async getSearch(query, options) {
				return getSearch(url, query, {
					page: options?.page,
					type: options?.type
				}).then(Transformer.search);
			}
		};
	}
};

export default adapter;
