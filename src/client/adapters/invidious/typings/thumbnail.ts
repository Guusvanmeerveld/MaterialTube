import z from "zod";

const qualityTypes = [
	"maxres",
	"maxresdefault",
	"sddefault",
	"high",
	"medium",
	"default",
	"start",
	"middle",
	"end"
] as const;

export const AuthorThumbnailModel = z.object({
	url: z.string(),
	width: z.number(),
	height: z.number()
});

export const ThumbnailModel = z.object({
	url: z.string().url(),
	width: z.number(),
	height: z.number(),
	quality: z.enum(qualityTypes)
});

type Thumbnail = z.infer<typeof ThumbnailModel>;

export default Thumbnail;
