import { Video } from "@/client/typings/video";
import { Suggestions } from "@/client/typings/search/suggestions";
import {
	ChannelResult,
	PlaylistResult,
	SearchResults,
	VideoResult
} from "@/client/typings/search";

import InvidiousVideo from "./typings/video";
import InvidiousSuggestions from "./typings/search/suggestions";
import InvidiousSearch from "./typings/search";
import InvidiousThumbnail from "./typings/thumbnail";

export default class Transformer {
	private static findBestThumbnail(
		thumbnails: InvidiousThumbnail[]
	): string | null {
		const thumbnail = thumbnails.find(
			(thumbnail) =>
				thumbnail.quality == "maxresdefault" ||
				thumbnail.quality == "default" ||
				thumbnail.quality == "medium" ||
				thumbnail.quality == "middle"
		);

		return thumbnail?.url ?? null;
	}

	public static video(data: InvidiousVideo): Video {
		const thumbnail = Transformer.findBestThumbnail(data.videoThumbnails);

		if (thumbnail === null)
			throw new Error(
				`Invidious: Missing thumbnail for video with id ${data.videoId}`
			);

		return {
			author: { id: data.authorId, name: data.author },
			duration: data.lengthSeconds * 1000,
			description: data.description,
			live: data.liveNow,
			id: data.videoId,
			title: data.title,
			thumbnail: thumbnail,
			uploaded: new Date(data.published * 1000 ?? 0),
			views: data.viewCount
		};
	}

	public static videos(data: InvidiousVideo[]): Video[] {
		return data.map(Transformer.video);
	}

	public static suggestions(data: InvidiousSuggestions): Suggestions {
		return data.suggestions;
	}

	public static search(data: InvidiousSearch): SearchResults {
		return data.map((result) => {
			switch (result.type) {
				case "video":
					const video: VideoResult = {
						...Transformer.video(result),
						type: "video"
					};

					return video;

				case "channel":
					const channel: ChannelResult = {
						type: "channel",
						name: result.author,
						id: result.authorId,
						thumbnail: result.authorThumbnails[0].url,
						subscribers: result.subCount,
						videos: result.videoCount,
						description: result.description
					};

					return channel;

				case "playlist":
					const playlist: PlaylistResult = {
						type: "playlist",
						title: result.title,
						author: {
							name: result.author,
							id: result.authorId
						},
						id: result.playlistId,
						numberOfVideos: result.videoCount,
						thumbnail: result.playlistThumbnail,
						videos: result.videos.map((video) => {
							const thumbnail = Transformer.findBestThumbnail(
								video.videoThumbnails
							);
							if (thumbnail === null)
								throw new Error(
									`Invidious: Missing thumbnail for video with id ${video.videoId}`
								);

							return {
								title: video.title,
								id: video.videoId,
								duration: video.lengthSeconds * 1000,
								thumbnail: thumbnail
							};
						})
					};

					return playlist;
			}
		});
	}
}
