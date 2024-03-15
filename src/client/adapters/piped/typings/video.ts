import z from "zod";

export const VideoModel = z.object({
	duration: z.number(), // The duration of the video in seconds
	thumbnail: z.string().url(), // The thumbnail of the video
	title: z.string(), // The title of the video
	uploaded: z.number(),
	uploadedDate: z.string(), // The date the video was uploaded
	uploaderName: z.string(),
	uploaderAvatar: z.string().url(), // The avatar of the channel of the video
	uploaderUrl: z.string(), // The URL of the channel of the video
	uploaderVerified: z.boolean(), // Whether or not the channel of the video is verified
	url: z.string(), // The URL of the video
	views: z.number() // The number of views the video has
});

type Video = z.infer<typeof VideoModel>;

export default Video;
