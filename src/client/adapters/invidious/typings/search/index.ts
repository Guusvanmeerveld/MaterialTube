import z from "zod";

import { AuthorThumbnailModel, ThumbnailModel } from "../thumbnail";
import { VideoModel } from "../video";

export const VideoResultModel = z
	.object({
		type: z.literal("video")
	})
	.and(VideoModel);

export const ChannelResultModel = z.object({
	type: z.literal("channel"),
	author: z.string(),
	authorId: z.string(),
	authorUrl: z.string(),
	authorThumbnails: AuthorThumbnailModel.array(),
	autoGenerated: z.boolean(),
	subCount: z.number(),
	videoCount: z.number(),
	description: z.string(),
	descriptionHtml: z.string()
});

export const PlaylistResultModel = z.object({
	type: z.literal("playlist"),
	title: z.string(),
	playlistId: z.string(),
	playlistThumbnail: z.string().url(),
	author: z.string(),
	authorId: z.string(),
	authorUrl: z.string(),
	authorVerified: z.boolean(),
	videoCount: z.number(),
	videos: z
		.object({
			title: z.string(),
			videoId: z.string(),
			lengthSeconds: z.number(),
			videoThumbnails: ThumbnailModel.array()
		})
		.array()
});

export const SearchModel = z
	.union([PlaylistResultModel, VideoResultModel, ChannelResultModel])
	.array();

type Search = z.infer<typeof SearchModel>;

export default Search;
