import z from "zod";

export const ThumbnailModel = z.object({
	quality: z.string(),
	url: z.string().url(),
	width: z.number(),
	height: z.number()
});

type Thumbnail = z.infer<typeof ThumbnailModel>;

export default Thumbnail;
