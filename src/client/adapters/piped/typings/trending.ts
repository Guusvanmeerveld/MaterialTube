import z from "zod";

export const TrendingModel = z.object({
	duration: z.number(), // The duration of the trending video in seconds
	thumbnail: z.string().url(), // The thumbnail of the trending video
	title: z.string(), // The title of the trending video
	uploaded: z.number(),
	uploadedDate: z.string(), // The date the trending video was uploaded
	uploaderName: z.string(),
	uploaderAvatar: z.string().url(), // The avatar of the channel of the trending video
	uploaderUrl: z.string(), // The URL of the channel of the trending video
	uploaderVerified: z.boolean(), // Whether or not the channel of the trending video is verified
	url: z.string(), // The URL of the trending video
	views: z.number() // The number of views the trending video has
});

type Trending = z.infer<typeof TrendingModel>;

export default Trending;
