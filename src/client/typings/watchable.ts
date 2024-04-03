import { Item } from "./item";
import { Stream } from "./stream";
import { Video } from "./video";

export interface Watchable {
	video: Video;
	streams: Stream[];
	keywords: string[];
	likes: number;
	dislikes: number;
	category: string;
	related: Item[];
}
