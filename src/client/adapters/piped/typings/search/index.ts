import z from "zod";
import { VideoModel } from "../video";

export const VideoResultModel = z
	.object({
		type: z.literal("stream")
	})
	.and(VideoModel);

export const ChannelResultModel = z.object({
	type: z.literal("channel"),
	url: z.string(),
	name: z.string(),
	thumbnail: z.string().url(),
	description: z.string().nullable(),
	subscribers: z.number(),
	videos: z.number(),
	verified: z.boolean()
});

export const PlaylistResultModel = z.object({
	type: z.literal("playlist"),
	url: z.string(),
	name: z.string(),
	thumbnail: z.string().url(),
	uploaderName: z.string(),
	uploaderUrl: z.string(),
	uploaderVerified: z.boolean(),
	playlistType: z.string(),
	videos: z.number()
});

export const SearchModel = z.object({
	items: z
		.union([VideoResultModel, ChannelResultModel, PlaylistResultModel])
		.array(),
	nextpage: z.string(),
	suggestion: z.string().nullable(),
	corrected: z.boolean()
});

type Search = z.infer<typeof SearchModel>;

export default Search;
