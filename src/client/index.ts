import { TrendingVideo } from "./typings/trending";

import InvidiousAdapter from "./adapters/invidious";
import PipedAdapter from "./adapters/piped";

import Adapter, { ApiType } from "./adapters";

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

	private getAdapterForApiType(apiType: ApiType): Adapter {
		const adapter = this.adapters.find((adapter) => adapter.apiType == apiType);

		if (adapter === undefined)
			throw new Error(`Could not find an adapter with api type ${apiType}`);

		return adapter;
	}

	private getBestApi(): RemoteApi {
		const randomIndex = Math.floor(Math.random() * this.apis.length);

		return this.apis[randomIndex];
	}

	public async getTrending(region: string): Promise<TrendingVideo[]> {
		const api = this.getBestApi();

		const adapter = this.getAdapterForApiType(api.type);

		return await adapter.connect(api.baseUrl).getTrending(region);
	}
}
