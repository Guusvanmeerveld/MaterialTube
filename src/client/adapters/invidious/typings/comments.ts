import z from "zod";

import { AuthorThumbnailModel } from "./thumbnail";

export const CommentModel = z.object({
	author: z.string(),
	authorThumbnails: AuthorThumbnailModel.array(),
	authorId: z.string(),
	authorUrl: z.string(),

	isEdited: z.boolean(),
	isPinned: z.boolean(),

	content: z.string(),
	contentHtml: z.string(),
	published: z.number(),
	publishedText: z.string(),
	likeCount: z.number(),
	commentId: z.string(),
	authorIsChannelOwner: z.boolean(),
	creatorHeart: z
		.object({
			creatorThumbnail: z.string(),
			creatorName: z.string()
		})
		.optional(),
	replies: z
		.object({
			replyCount: z.number(),
			continuation: z.string()
		})
		.optional()
});

export const CommentsModel = z.object({
	commentCount: z.number().optional(),
	videoId: z.string(),
	comments: CommentModel.array(),
	continuation: z.string().optional()
});

type Comments = z.infer<typeof CommentsModel>;

export default Comments;
