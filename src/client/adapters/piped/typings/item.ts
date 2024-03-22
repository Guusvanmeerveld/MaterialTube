import z from "zod";

import { VideoModel } from "./video";

export const VideoItemModel = z
	.object({
		type: z.literal("stream")
	})
	.and(VideoModel);

export const ChannelItemModel = z.object({
	type: z.literal("channel"),
	url: z.string(),
	name: z.string(),
	thumbnail: z.string().url(),
	description: z.string().nullable(),
	subscribers: z.number(),
	videos: z.number(),
	verified: z.boolean()
});

export const PlaylistItemModel = z.object({
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

export const ItemModel = z.union([
	VideoItemModel,
	ChannelItemModel,
	PlaylistItemModel
]);

type Item = z.infer<typeof ItemModel>;

export default Item;
