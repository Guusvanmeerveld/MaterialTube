import z from "zod";

export const SuggestionsModel = z.object({
	query: z.string(),
	suggestions: z.string().array()
});

type Suggestions = z.infer<typeof SuggestionsModel>;

export default Suggestions;
