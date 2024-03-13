import { TrendingVideo } from "@/client/typings/trending";

import PipedTrending from "./typings/trending";

const videoIdRegex = /\/watch\?v=(.+)/;
const channelIdRegex = /\/channel\/(.+)/;

export default class Transformer {
	public static trending(data: PipedTrending[]): TrendingVideo[] {
		return data.map((video) => {
			const videoIdMatch = video.url.match(videoIdRegex);

			const videoId = videoIdMatch !== null ? videoIdMatch[1] : null;

			if (videoId === null) throw new Error("Piped: Missing trending video id");

			const channelIdMatch = video.uploaderUrl.match(channelIdRegex);

			const channelId = channelIdMatch !== null ? channelIdMatch[1] : null;

			if (channelId === null)
				throw new Error("Piped: Missing trending channelId");

			return {
				duration: video.duration * 1000,
				views: video.views,
				id: videoId,
				uploaded: new Date(video.uploaded),
				thumbnails: [{ url: video.thumbnail }],
				title: video.title,
				author: { id: channelId, name: video.uploaderName }
			};
		});
	}
}
