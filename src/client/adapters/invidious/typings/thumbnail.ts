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

export const ThumbnailModel = z.object({
	quality: z.enum(qualityTypes),
	url: z.string().url(),
	width: z.number(),
	height: z.number()
});

type Thumbnail = z.infer<typeof ThumbnailModel>;

export default Thumbnail;
