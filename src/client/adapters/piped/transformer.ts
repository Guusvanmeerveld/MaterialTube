import { Video } from "@/client/typings/video";
import { SearchResults } from "@/client/typings/search";
import { Stream } from "@/client/typings/stream";

import PipedVideo from "./typings/video";
import PipedSearch from "./typings/search";
import PipedStream from "./typings/stream";
import PipedItem from "./typings/item";
import {
	parseChannelIdFromUrl,
	parseVideoIdFromUrl
} from "@/utils/parseIdFromUrl";
import {
	ChannelItem,
	Item,
	PlaylistItem,
	VideoItem
} from "@/client/typings/item";

export default class Transformer {
	private static item(data: PipedItem): Item {
		switch (data.type) {
			case "stream":
				const video: VideoItem = {
					...Transformer.video(data),
					type: "video"
				};

				return video;

			case "channel":
				const id = parseChannelIdFromUrl(data.url);

				if (id === null) throw new Error("Piped: Missing channelId");

				const channel: ChannelItem = {
					type: "channel",
					name: data.name,
					id: id,
					thumbnail: data.thumbnail,
					subscribers: data.subscribers,
					videos: data.videos,
					description: data.description ?? ""
				};

				return channel;

			case "playlist":
				const channelId = parseChannelIdFromUrl(data.uploaderUrl);

				if (channelId === null) throw new Error("Piped: Missing channelId");

				const playlist: PlaylistItem = {
					type: "playlist",
					title: data.name,
					author: {
						name: data.uploaderName,
						id: channelId
					},
					thumbnail: data.thumbnail,
					id: data.url,
					numberOfVideos: data.videos
				};

				return playlist;
		}
	}

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
			author: {
				id: channelId,
				name: data.uploaderName,
				avatar: data.uploaderAvatar
			}
		};
	}

	public static videos(data: PipedVideo[]): Video[] {
		return data.map(Transformer.video);
	}

	public static search(data: PipedSearch): SearchResults {
		const items = data.items.map(Transformer.item);

		return { items, nextCursor: data.nextpage };
	}

	public static stream(data: PipedStream): Stream {
		const channelId = parseChannelIdFromUrl(data.uploaderUrl);

		if (channelId === null) throw new Error("Piped: Missing channelId");

		return {
			category: data.category,
			keywords: data.tags,
			dislikes: data.dislikes,
			likes: data.likes,
			related: data.relatedStreams.map(Transformer.item),
			video: {
				author: {
					id: channelId,
					name: data.uploader,
					avatar: data.uploaderAvatar
				},
				description: data.description,
				duration: data.duration * 1000,
				id: "",
				live: data.livestream,
				thumbnail: data.thumbnailUrl,
				title: data.title,
				uploaded: data.uploadDate,
				views: data.views
			}
		};
	}
}
