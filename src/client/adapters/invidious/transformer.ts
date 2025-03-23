import { Comments } from "@/client/typings/comment";
import {
	ChannelItem,
	Item,
	PlaylistItem,
	VideoItem
} from "@/client/typings/item";
import { Suggestions } from "@/client/typings/search/suggestions";
import { Stream, StreamType } from "@/client/typings/stream";
import { Video } from "@/client/typings/video";
import { Watchable } from "@/client/typings/watchable";
import { parseSubscriberCount } from "@/utils/parseSubscriberCount";

import InvidiousComments from "./typings/comments";
import InvidiousSearch from "./typings/search";
import InvidiousSuggestions from "./typings/search/suggestions";
import InvidiousStream, {
	RecommendedVideo as InvidiousRecommendedVideo
} from "./typings/stream";
import InvidiousThumbnail from "./typings/thumbnail";
import InvidiousVideo from "./typings/video";

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

	private static recommendedVideo(data: InvidiousRecommendedVideo): VideoItem {
		const thumbnail = Transformer.findBestThumbnail(data.videoThumbnails);

		if (thumbnail === null)
			throw new Error(
				`Invidious: Missing thumbnail for video with id ${data.videoId}`
			);

		return {
			type: "video",
			author: { id: data.authorId, name: data.author },
			duration: data.lengthSeconds * 1000,
			live: data.liveNow,
			id: data.videoId,
			title: data.title,
			thumbnail: thumbnail,
			views: data.viewCount
		};
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
			uploaded: new Date(data.published * 1000 || 0),
			views: data.viewCount
		};
	}

	public static videos(data: InvidiousVideo[]): Video[] {
		return data.map(Transformer.video);
	}

	public static suggestions(data: InvidiousSuggestions): Suggestions {
		return data.suggestions;
	}

	public static search(data: InvidiousSearch): Item[] {
		return data.map((result) => {
			switch (result.type) {
				case "video":
					const video: VideoItem = {
						...Transformer.video(result),
						type: "video"
					};

					return video;

				case "channel":
					const channel: ChannelItem = {
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
					const playlist: PlaylistItem = {
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

	public static stream(data: InvidiousStream): Watchable {
		const thumbnail = Transformer.findBestThumbnail(data.videoThumbnails);

		if (thumbnail === null)
			throw new Error(
				`Invidious: Missing thumbnail for video with id ${data.videoId}`
			);

		const streams: Stream[] = [];

		streams.push({ type: StreamType.Dash, url: data.dashUrl });

		return {
			category: data.genre,
			dislikes: data.dislikeCount,
			likes: data.likeCount,
			keywords: data.keywords,
			related: data.recommendedVideos.map(Transformer.recommendedVideo),
			streams,
			video: {
				author: {
					id: data.authorId,
					name: data.author,
					avatar: data.authorThumbnails[0].url,
					subscribers: parseSubscriberCount(data.subCountText)
				},
				description: data.description,
				duration: data.lengthSeconds * 1000,
				id: data.videoId,
				live: data.liveNow,
				thumbnail: thumbnail,
				title: data.title,
				uploaded: new Date(data.published * 1000),
				views: data.viewCount
			}
		};
	}

	public static comments(comments: InvidiousComments): Comments {
		return {
			enabled: true,
			count: comments.commentCount,
			data: comments.comments.map((comment) => ({
				id: comment.commentId,
				message: comment.content,
				likes: comment.likeCount,
				edited: comment.isEdited,
				written: new Date(comment.published * 1000),
				author: {
					name: comment.author,
					id: comment.authorId,
					handle: comment.authorUrl,
					avatar: comment.authorThumbnails[0].url
				},
				videoUploaderLiked: !!comment.creatorHeart,
				videoUploaderReplied: false,
				pinned: comment.isPinned,
				repliesToken: comment.replies?.continuation
			}))
		};
	}
}
