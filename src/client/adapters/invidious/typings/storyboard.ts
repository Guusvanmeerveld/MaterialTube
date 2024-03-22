import z from "zod";

export const StoryboardModel = z.object({
	url: z.string(),
	templateUrl: z.string().url(),
	width: z.number(),
	height: z.number(),
	count: z.number(),
	interval: z.number(),
	storyboardWidth: z.number(),
	storyboardHeight: z.number(),
	storyboardCount: z.number()
});

export type Storyboard = z.infer<typeof StoryboardModel>;
