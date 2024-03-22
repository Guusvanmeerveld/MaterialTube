import z from "zod";

import { StoryboardModel } from "./storyboard";
import { AuthorThumbnailModel, ThumbnailModel } from "./thumbnail";

export const AdaptiveFormatModel = z.object({
	index: z.string(),
	bitrate: z.string(),
	init: z.string(),
	url: z.string().url(),
	itag: z.string(),
	type: z.string(),
	clen: z.string(),
	lmt: z.string(),
	projectionType: z.number().or(z.string()),
	container: z.string().optional(),
	encoding: z.string().optional(),
	qualityLabel: z.string().optional(),
	resolution: z.string().optional(),
	audioQuality: z.string().optional(),
	audioSampleRate: z.number().optional(),
	audioChannels: z.number().optional()
});

export const FormatStreamModel = z.object({
	url: z.string().url(),
	itag: z.string(),
	type: z.string(),
	quality: z.string(),
	fps: z.number(),
	container: z.string(),
	encoding: z.string(),
	resolution: z.string(),
	qualityLabel: z.string(),
	size: z.string()
});

export const CaptionModel = z.object({
	label: z.string(),
	language_code: z.string(),
	url: z.string()
});

export const RecommendedVideoModel = z.object({
	title: z.string(),
	videoId: z.string(),
	videoThumbnails: ThumbnailModel.array(),

	lengthSeconds: z.number(),
	viewCount: z.number(),

	author: z.string(),
	authorId: z.string(),
	authorUrl: z.string(),

	liveNow: z.boolean().optional().default(false),
	paid: z.boolean().optional().default(false),
	premium: z.boolean().optional().default(false)
});

export type RecommendedVideo = z.infer<typeof RecommendedVideoModel>;

export const StreamModel = z.object({
	type: z.string(),
	title: z.string(),
	videoId: z.string(),
	videoThumbnails: ThumbnailModel.array(),
	storyboards: StoryboardModel.array(),
	description: z.string(),
	descriptionHtml: z.string(),
	published: z.number(),
	publishedText: z.string(),
	keywords: z.string().array(),
	viewCount: z.number(),
	likeCount: z.number(),
	dislikeCount: z.number(),
	paid: z.boolean().optional().default(false),
	premium: z.boolean().optional().default(false),
	isFamilyFriendly: z.boolean(),
	allowedRegions: z.string().array(),
	genre: z.string(),
	genreUrl: z.string(),
	author: z.string(),
	authorId: z.string(),
	authorUrl: z.string(),
	authorVerified: z.boolean(),
	authorThumbnails: AuthorThumbnailModel.array(),
	subCountText: z.string(),
	lengthSeconds: z.number(),
	allowRatings: z.boolean(),
	rating: z.number(),
	isListed: z.boolean(),
	liveNow: z.boolean().optional().default(false),
	isUpcoming: z.boolean(),
	dashUrl: z.string().url(),
	adaptiveFormats: AdaptiveFormatModel.array(),
	formatStreams: FormatStreamModel.array(),
	captions: CaptionModel.array(),
	recommendedVideos: RecommendedVideoModel.array()
});

type Stream = z.infer<typeof StreamModel>;

export default Stream;
