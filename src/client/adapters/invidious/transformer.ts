import { TrendingVideo } from "@/client/typings/trending";

import InvidiousTrending from "./typings/trending";

export default class Transformer {
	public static trending(data: InvidiousTrending[]): TrendingVideo[] {
		return data.map((video) => {
			const thumbnail = video.videoThumbnails.find(
				(thumbnail) =>
					thumbnail.quality == "default" ||
					thumbnail.quality == "medium" ||
					thumbnail.quality == "middle"
			);

			if (thumbnail === undefined)
				throw new Error(
					`Invidious: Missing thumbnail for video with id ${video.videoId}`
				);

			return {
				author: { id: video.authorId, name: video.author },
				duration: video.lengthSeconds * 1000,
				id: video.videoId,
				title: video.title,
				thumbnail: thumbnail.url,
				uploaded: new Date(video.published * 1000 ?? 0),
				views: video.viewCount
			};
		});
	}
}
