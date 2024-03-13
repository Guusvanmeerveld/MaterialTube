import { TrendingVideo } from "../typings/trending";

export interface ConnectedAdapter {
	getTrending(region: string): Promise<TrendingVideo[]>;
}

export default interface Adapter {
	apiType: ApiType;

	connect(url: string): ConnectedAdapter;
}

export enum ApiType {
	Piped,
	Invidious
}
