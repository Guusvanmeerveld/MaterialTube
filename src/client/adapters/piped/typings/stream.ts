import z from "zod";
import { ItemModel } from "./item";

export const AudioStreamModel = z.object({
	url: z.string().url(),
	format: z.string(),
	quality: z.string(),
	mimeType: z.string(),
	codec: z.string().nullable(),
	audioTrackId: z.null(),
	audioTrackName: z.null(),
	audioTrackType: z.null(),
	audioTrackLocale: z.null(),
	videoOnly: z.boolean(),
	itag: z.number(),
	bitrate: z.number(),
	initStart: z.number(),
	initEnd: z.number(),
	indexStart: z.number(),
	indexEnd: z.number(),
	width: z.number(),
	height: z.number(),
	fps: z.number(),
	contentLength: z.number()
});

export const VideoStreamModel = z.object({
	url: z.string(),
	format: z.string(),
	quality: z.string(),
	mimeType: z.string(),
	codec: z.string().nullable(),
	audioTrackId: z.null(),
	audioTrackName: z.null(),
	audioTrackType: z.null(),
	audioTrackLocale: z.null(),
	videoOnly: z.boolean(),
	itag: z.number(),
	bitrate: z.number(),
	initStart: z.number(),
	initEnd: z.number(),
	indexStart: z.number(),
	indexEnd: z.number(),
	width: z.number(),
	height: z.number(),
	fps: z.number(),
	contentLength: z.number()
});

export const ChapterModel = z.object({
	title: z.string(),
	image: z.string(),
	start: z.number()
});

export const PreviewFrameModel = z.object({
	urls: z.array(z.string()),
	frameWidth: z.number(),
	frameHeight: z.number(),
	totalCount: z.number(),
	durationPerFrame: z.number(),
	framesPerPageX: z.number(),
	framesPerPageY: z.number()
});

export const StreamModel = z.object({
	title: z.string(),
	description: z.string(),
	uploadDate: z.coerce.date(),
	uploader: z.string(),
	uploaderUrl: z.string(),
	uploaderAvatar: z.string().url(),
	thumbnailUrl: z.string().url(),
	hls: z.string().url(),
	dash: z.null(),
	lbryId: z.null(),
	category: z.string(),
	license: z.string(),
	visibility: z.string(),
	tags: z.array(z.string()),
	metaInfo: z.array(z.unknown()),
	uploaderVerified: z.boolean(),
	duration: z.number(),
	views: z.number(),
	likes: z.number(),
	dislikes: z.number(),
	uploaderSubscriberCount: z.number(),
	audioStreams: AudioStreamModel.array(),
	videoStreams: VideoStreamModel.array(),
	relatedStreams: ItemModel.array(),
	subtitles: z.array(z.unknown()),
	livestream: z.boolean(),
	proxyUrl: z.string().url(),
	chapters: ChapterModel.array(),
	previewFrames: PreviewFrameModel.array()
});

type Stream = z.infer<typeof StreamModel>;

export default Stream;
