import z from "zod";

export const CommentModel = z.object({
	author: z.string().describe("The name of the author of the comment"),
	commentId: z.string().describe("The comment ID"),
	commentText: z.string().describe("The text of the comment"),
	commentedTime: z.string().describe("The time the comment was made"),
	commentorUrl: z.string().describe("The URL of the channel of the comment"),
	hearted: z.boolean().describe("Whether or not the comment has been hearted"),
	likeCount: z.number().describe("The number of likes the comment has"),
	pinned: z.boolean().describe("Whether or not the comment is pinned"),
	thumbnail: z.string().url().describe("The thumbnail of the comment"),
	verified: z
		.boolean()
		.describe("Whether or not the author of the comment is verified"),
	replyCount: z
		.number()
		.transform((number) => (number < 0 ? 0 : number))
		.optional()
		.describe("The amount of replies this comment has"),
	repliesPage: z
		.string()
		.nullable()
		.describe("The token needed to fetch the replies"),
	creatorReplied: z
		.boolean()
		.describe("Whether the creator has replied to the comment")
});

export const CommentsModel = z.object({
	comments: CommentModel.array(), // A list of comments
	commentCount: z
		.number()
		.transform((number) => (number < 0 ? 0 : number))
		.optional(),
	disabled: z.boolean(), // Whether or not the comments are disabled
	nextpage: z
		.string()
		.nullable()
		.describe("A JSON encoded page, which is used for the nextpage endpoint.")
});

type Comments = z.infer<typeof CommentsModel>;

export default Comments;
