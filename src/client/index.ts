import { Video } from "./typings/video";

import InvidiousAdapter from "./adapters/invidious";
import PipedAdapter from "./adapters/piped";

import Adapter, { ApiType, ConnectedAdapter } from "./adapters";
import { Suggestions } from "./typings/search/suggestions";
import { SearchResults } from "./typings/search";
import { SearchOptions } from "./typings/search/options";
import { Stream } from "./typings/stream";

export interface RemoteApi {
	type: ApiType;
	baseUrl: string;
	score: number;
}

export default class Client {
	private apis: RemoteApi[];
	private adapters: Adapter[] = [InvidiousAdapter, PipedAdapter];

	constructor(
		apis: {
			type: ApiType;
			baseUrl: string;
		}[]
	) {
		this.apis = apis.map((api) => ({ ...api, score: 0 }));
	}

	private findAdapterForApiType(apiType: ApiType): Adapter {
		const adapter = this.adapters.find((adapter) => adapter.apiType == apiType);

		if (adapter === undefined)
			throw new Error(`Could not find an adapter with api type ${apiType}`);

		return adapter;
	}

	private getBestApi(): RemoteApi {
		const randomIndex = Math.floor(Math.random() * this.apis.length);

		return this.apis[randomIndex];
	}

	private getBestAdapter(): ConnectedAdapter {
		const api = this.getBestApi();

		const adapter = this.findAdapterForApiType(api.type);

		return adapter.connect(api.baseUrl);
	}

	public async getTrending(region: string): Promise<Video[]> {
		const adapter = this.getBestAdapter();

		return await adapter.getTrending(region);
	}

	public async getSearchSuggestions(query: string): Promise<Suggestions> {
		const adapter = this.getBestAdapter();

		return await adapter.getSearchSuggestions(query);
	}

	public async getSearch(
		query: string,
		options?: SearchOptions
	): Promise<SearchResults> {
		const adapter = this.getBestAdapter();

		const pageParam =
			options?.pageParam?.length === 0 ? undefined : options?.pageParam;

		return await adapter.getSearch(query, {
			pageParam: pageParam,
			type: options?.type ?? "all"
		});
	}

	public async getStream(videoId: string): Promise<Stream> {
		const adapter = this.getBestAdapter();

		return await adapter.getStream(videoId);
	}
}
