import { Video } from "@/client/typings/video";
import {
	ChannelResult,
	PlaylistResult,
	SearchResults,
	VideoResult
} from "@/client/typings/search";

import PipedVideo from "./typings/video";
import PipedSearch from "./typings/search";
import {
	parseChannelIdFromUrl,
	parseVideoIdFromUrl
} from "@/utils/parseIdFromUrl";

export default class Transformer {
	public static video(data: PipedVideo): Video {
		const videoId = parseVideoIdFromUrl(data.url);

		if (videoId === null) throw new Error("Piped: Missing video id");

		const channelId = parseChannelIdFromUrl(data.uploaderUrl);

		if (channelId === null) throw new Error("Piped: Missing video channelId");

		return {
			duration: data.duration * 1000,
			views: data.views,
			id: videoId,
			uploaded: new Date(data.uploaded),
			thumbnail: data.thumbnail,
			title: data.title,
			description: "",
			live: false,
			author: { id: channelId, name: data.uploaderName }
		};
	}

	public static videos(data: PipedVideo[]): Video[] {
		return data.map(Transformer.video);
	}

	public static search(data: PipedSearch): SearchResults {
		return data.items.map((result) => {
			switch (result.type) {
				case "stream":
					const video: VideoResult = {
						...Transformer.video(result),
						type: "video"
					};

					return video;

				case "channel":
					const id = parseChannelIdFromUrl(result.url);

					if (id === null) throw new Error("Piped: Missing channelId");

					const channel: ChannelResult = {
						type: "channel",
						name: result.name,
						id: id,
						thumbnail: result.thumbnail,
						subscribers: result.subscribers,
						videos: result.videos,
						description: result.description ?? ""
					};

					return channel;

				case "playlist":
					const channelId = parseChannelIdFromUrl(result.uploaderUrl);

					if (channelId === null) throw new Error("Piped: Missing channelId");

					const playlist: PlaylistResult = {
						type: "playlist",
						title: result.name,
						author: {
							name: result.uploaderName,
							id: channelId
						},
						id: result.url,
						numberOfVideos: result.videos
					};

					return playlist;
			}
		});
	}
}
