import path from "path";

import ky from "ky";

import Adapter, { ApiType } from "@/client/adapters";

import Transformer from "./transformer";
import Search, { SearchModel } from "./typings/search";
import Suggestions, { SuggestionsModel } from "./typings/search/suggestions";
import Stream, { StreamModel } from "./typings/stream";
import Video, { VideoModel } from "./typings/video";

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

const getVideo = async (baseUrl: string, videoId: string): Promise<Stream> => {
	const url = new URL(apiPath("videos", videoId), baseUrl);

	const response = await ky.get(url);

	const json = await response.json();

	const data = StreamModel.parse(json);

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
				const page = options?.pageParam ? parseInt(options.pageParam) : 1;

				const items = await getSearch(url, query, {
					page: page,
					type: options?.type
				}).then(Transformer.search);

				return { items: items, nextCursor: (page + 1).toString() };
			},

			async getStream(videoId) {
				return getVideo(url, videoId).then(Transformer.stream);
			}
		};
	}
};

export default adapter;
