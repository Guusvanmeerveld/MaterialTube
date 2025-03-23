import { Channel } from "@/client/typings/channel";
import { Comments } from "@/client/typings/comment";
import {
	ChannelItem,
	Item,
	PlaylistItem,
	VideoItem
} from "@/client/typings/item";
import { SearchResults } from "@/client/typings/search";
import { Stream, StreamType } from "@/client/typings/stream";
import { Video } from "@/client/typings/video";
import { Watchable } from "@/client/typings/watchable";
import {
	parseChannelIdFromUrl,
	parseVideoIdFromUrl
} from "@/utils/parseIdFromUrl";
import { parseRelativeTime } from "@/utils/parseRelativeTime";

import PipedChannel from "./typings/channel";
import PipedComments from "./typings/comments";
import PipedItem from "./typings/item";
import PipedSearch from "./typings/search";
import PipedStream from "./typings/stream";
import PipedVideo from "./typings/video";

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
				const channelId = data.uploaderUrl
					? parseChannelIdFromUrl(data.uploaderUrl)
					: null;

				const playlist: PlaylistItem = {
					type: "playlist",
					title: data.name,
					author: {
						name: data.uploaderName,
						id: channelId ?? undefined
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

		const channelId = parseChannelIdFromUrl(data.uploaderUrl) ?? undefined;

		return {
			duration: data.duration * 1000,
			views: data.views,
			id: videoId,
			uploaded: new Date(data.uploaded),
			thumbnail: data.thumbnail,
			title: data.title,
			live: false,
			author: {
				id: channelId,
				name: data.uploaderName,
				avatar: data.uploaderAvatar ?? undefined
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

	public static stream(data: PipedStream, videoId: string): Watchable {
		const streams: Stream[] = [];

		if (data.dash) streams.push({ type: StreamType.Dash, url: data.dash });

		if (data.hls) streams.push({ type: StreamType.Hls, url: data.hls });

		return {
			category: data.category,
			keywords: data.tags,
			dislikes: data.dislikes,
			likes: data.likes,
			related: data.relatedStreams.map(Transformer.item),
			streams,
			video: {
				author: {
					id: parseChannelIdFromUrl(data.uploaderUrl) ?? undefined,
					name: data.uploader,
					avatar: data.uploaderAvatar,
					subscribers: data.uploaderSubscriberCount
				},
				description: data.description,
				duration: data.duration * 1000,
				id: videoId,
				live: data.livestream,
				thumbnail: data.thumbnailUrl,
				title: data.title,
				uploaded: data.uploadDate,
				views: data.views
			}
		};
	}

	public static comments(data: PipedComments): Comments {
		return {
			enabled: !data.disabled,
			count: data.commentCount,
			data: data.comments.map((comment) => ({
				id: comment.commentId,
				message: comment.commentText,
				likes: comment.likeCount,
				edited: false,

				written: parseRelativeTime(comment.commentedTime).toJSDate(),

				author: {
					name: comment.author,
					id: parseChannelIdFromUrl(comment.commentorUrl) ?? undefined,
					avatar: comment.thumbnail,
					verified: comment.verified
				},

				pinned: comment.pinned,
				videoUploaderLiked: comment.hearted,
				videoUploaderReplied: comment.creatorReplied,

				repliesToken: comment.repliesPage ?? undefined
			}))
		};
	}

	public static channel(data: PipedChannel): Channel {
		return {
			name: data.name,
			id: data.id,
			description: data.description ?? undefined,
			avatar: data.avatarUrl ?? undefined,
			subscribers: data.subscriberCount,
			banner: data.bannerUrl ?? undefined,
			verified: data.verified
		};
	}
}
