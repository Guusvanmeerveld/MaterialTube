import ky from "ky";

import Adapter, { ApiType } from "@/client/adapters";

import Trending, { TrendingModel } from "./typings/trending";

import Transformer from "./transformer";

export const getTrending = async (
	apiBaseUrl: string,
	region = "US"
): Promise<Trending[]> => {
	const url = new URL("/trending", apiBaseUrl);

	const response = await ky.get(url, {
		searchParams: { region: region.toUpperCase() }
	});

	const json = await response.json();

	const data = TrendingModel.array().parse(json);

	return data;
};

const adapter: Adapter = {
	apiType: ApiType.Piped,

	connect(url) {
		return {
			getTrending(region) {
				return getTrending(url, region).then(Transformer.trending);
			}
		};
	}
};

export default adapter;
