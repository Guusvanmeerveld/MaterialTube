import ky from "ky";

import Trending, { TrendingModel } from "./typings/trending";
import Adapter, { ApiType } from "@/client/adapters";
import Transformer from "./transformer";

const apiPath = (path: string): string => `/api/v1/${path}`;

export type TrendingVideoType = "music" | "gaming" | "news" | "movies";

export const getTrending = async (
	baseUrl: string,
	region?: string,
	type?: TrendingVideoType
): Promise<Trending[]> => {
	const url = new URL(apiPath("trending"), baseUrl);

	const searchParams = new URLSearchParams();

	if (region !== undefined) searchParams.append("region", region);

	if (type !== undefined) searchParams.append("type", type);

	const response = await ky.get(url, {
		searchParams
	});

	const json = await response.json();

	const data = TrendingModel.array().parse(json);

	return data;
};

const adapter: Adapter = {
	apiType: ApiType.Invidious,

	connect(url) {
		return {
			getTrending(region) {
				return getTrending(url, region).then(Transformer.trending);
			}
		};
	}
};

export default adapter;
