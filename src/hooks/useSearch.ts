import { useRouter } from "next/navigation";

import { SearchType } from "@/client/typings/search/options";

const searchPathname = "/results";

export const useSearch = (): ((query: string, filter: SearchType) => void) => {
	const router = useRouter();

	return (query, filter) => {
		const params = new URLSearchParams();

		params.set("search_query", query);
		params.set("filter", filter);

		router.push(searchPathname + "?" + params.toString());
	};
};
