import z from "zod";

import { ItemModel } from "./item";

export const tabEnum = [
	"shorts",
	"albums",
	"playlists",
	"livestreams"
] as const;

export const tabType = z.enum(tabEnum);

export const ChannelModel = z.object({
	id: z.string(),
	name: z.string(),
	avatarUrl: z.string().url().nullable(),
	bannerUrl: z.string().url().nullable(),
	description: z.string().nullable(),
	nextpage: z.string().nullable(),
	subscriberCount: z.number(),
	verified: z.boolean(),
	relatedStreams: ItemModel.array(),
	tabs: z.object({ name: tabType, data: z.string() }).array()
});

type Channel = z.infer<typeof ChannelModel>;

export default Channel;
