import path from "path";

import ky from "ky";
import z from "zod";

import Adapter, { ApiType } from "@/client/adapters";
import { Suggestions } from "@/client/typings/search/suggestions";

import Transformer from "./transformer";
import Search, { SearchModel } from "./typings/search";
import Stream, { StreamModel } from "./typings/stream";
import Video, { VideoModel } from "./typings/video";

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

export type FilterType =
	| "all"
	| "videos"
	| "channels"
	| "playlists"
	| "music_videos"
	| "music_songs"
	| "music_albums"
	| "music_playlists"
	| "music_artists";

export interface SearchOptions {
	filter?: FilterType;
	nextpage?: string;
}

const getSearch = async (
	apiBaseUrl: string,
	query: string,
	options?: SearchOptions
): Promise<Search> => {
	let url: URL;

	if (options?.nextpage)
		url = new URL(path.join("nextpage", "search"), apiBaseUrl);
	else url = new URL("search", apiBaseUrl);

	const response = await ky.get(url, {
		searchParams: { ...options, q: query }
	});

	const json = await response.json();

	const data = SearchModel.parse(json);

	return data;
};

const getStream = async (
	apiBaseUrl: string,
	videoId: string
): Promise<Stream> => {
	const url = new URL(path.join("streams", videoId), apiBaseUrl);

	const response = await ky.get(url);

	const json = await response.json();

	const data = StreamModel.parse(json);

	return data;
};

const adapter: Adapter = {
	apiType: ApiType.Piped,

	connect(url) {
		return {
			async getTrending(region) {
				return getTrending(url, region).then(Transformer.videos);
			},

			async getSearchSuggestions(query) {
				return getSearchSuggestions(url, query);
			},
			async getSearch(query, options) {
				let filter: FilterType;

				switch (options?.type) {
					default:
						filter = "all";
						break;

					case "channel":
						filter = "channels";
						break;

					case "playlist":
						filter = "playlists";
						break;

					case "video":
						filter = "videos";
						break;
				}

				return getSearch(url, query, {
					filter: filter,
					nextpage: options?.pageParam
				}).then(Transformer.search);
			},

			async getStream(videoId) {
				return getStream(url, videoId).then(Transformer.stream);
			}
		};
	}
};

export default adapter;
