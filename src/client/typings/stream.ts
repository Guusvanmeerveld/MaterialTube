import { Item } from "./item";
import { Video } from "./video";

export interface Stream {
	video: Video;
	keywords: string[];
	likes: number;
	dislikes: number;
	category: string;
	related: Item[];
}
