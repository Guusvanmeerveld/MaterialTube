import z from "zod";
import ky from "ky";

import Adapter, { ApiType } from "@/client/adapters";

import Video, { VideoModel } from "./typings/video";

import Transformer from "./transformer";
import { Suggestions } from "@/client/typings/search/suggestions";
import Search, { SearchModel } from "./typings/search";

const getTrending = async (
	apiBaseUrl: string,
	region = "US"
): Promise<Video[]> => {
	const url = new URL("/trending", apiBaseUrl);

	const response = await ky.get(url, {
		searchParams: { region: region.toUpperCase() }
	});

	const json = await response.json();

	const data = VideoModel.array().parse(json);

	return data;
};

const getSearchSuggestions = async (
	apiBaseUrl: string,
	query: string
): Promise<Suggestions> => {
	const url = new URL("suggestions", apiBaseUrl);

	const response = await ky.get(url, {
		searchParams: { query: query }
	});

	const json = await response.json();

	const data = z.string().array().parse(json);

	return data;
};

const getSearch = async (
	apiBaseUrl: string,
	query: string
): Promise<Search> => {
	const url = new URL("search", apiBaseUrl);

	const response = await ky.get(url, {
		searchParams: { q: query, filter: "all" }
	});

	const json = await response.json();

	const data = SearchModel.parse(json);

	return data;
};

const adapter: Adapter = {
	apiType: ApiType.Piped,

	connect(url) {
		return {
			getTrending(region) {
				return getTrending(url, region).then(Transformer.videos);
			},

			getSearchSuggestions(query) {
				return getSearchSuggestions(url, query);
			},
			getSearch(query) {
				return getSearch(url, query).then(Transformer.search);
			}
		};
	}
};

export default adapter;
