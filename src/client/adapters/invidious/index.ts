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

const getSearch = async (baseUrl: string, query: string): Promise<Search> => {
	const url = new URL(apiPath("search"), baseUrl);

	const response = await ky.get(url, {
		searchParams: { q: query }
	});

	const json = await response.json();

	const data = SearchModel.parse(json);

	return data;
};

const adapter: Adapter = {
	apiType: ApiType.Invidious,

	connect(url) {
		return {
			getTrending(region) {
				return getTrending(url, region).then(Transformer.videos);
			},

			getSearchSuggestions(query) {
				return getSearchSuggestions(url, query).then(Transformer.suggestions);
			},
			getSearch(query) {
				return getSearch(url, query).then(Transformer.search);
			}
		};
	}
};

export default adapter;
