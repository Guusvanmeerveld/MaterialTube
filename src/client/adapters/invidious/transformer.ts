import { TrendingVideo } from "@/client/typings/trending";
import { Thumbnail } from "@/client/typings/thumbnail";

import InvidiousTrending from "./typings/trending";
import InvidiousThumbnail from "./typings/thumbnail";

export default class Transformer {
	public static thumbnails(data: InvidiousThumbnail[]): Thumbnail[] {
		return data.map((thumbnail) => ({ url: thumbnail.url }));
	}

	public static trending(data: InvidiousTrending[]): TrendingVideo[] {
		return data.map((video) => ({
			author: { id: video.authorId, name: video.author },
			duration: video.lengthSeconds * 1000,
			id: video.videoId,
			title: video.title,
			thumbnails: Transformer.thumbnails(video.videoThumbnails),
			uploaded: new Date(video.published * 1000 ?? 0),
			views: video.viewCount
		}));
	}
}
