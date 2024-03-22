import z from "zod";

import { ItemModel } from "../item";

export const SearchModel = z.object({
	items: ItemModel.array(),
	nextpage: z.string(),
	suggestion: z.string().nullable(),
	corrected: z.boolean()
});

type Search = z.infer<typeof SearchModel>;

export default Search;
