import z from "zod";
import { ThumbnailModel } from "./thumbnail";

export const VideoModel = z.object({
	title: z.string(),
	videoId: z.string(),
	videoThumbnails: ThumbnailModel.array(),

	lengthSeconds: z.number(),
	viewCount: z.number(),

	author: z.string(),
	authorId: z.string(),
	authorUrl: z.string(),

	published: z.number(),
	publishedText: z.string(),
	description: z.string(),
	descriptionHtml: z.string(),

	liveNow: z.boolean(),
	paid: z.boolean().optional().default(false),
	premium: z.boolean()
});

type Video = z.infer<typeof VideoModel>;

export default Video;
