import { SearchType } from "@/client/typings/search/options";
import { useRouter } from "next/navigation";

const searchPathname = "/results";

export const useSearch = (): ((query: string, filter?: SearchType) => void) => {
	const router = useRouter();

	return (query, filter = "all") => {
		const params = new URLSearchParams();

		params.set("search_query", query);
		params.set("filter", filter);

		router.push(searchPathname + "?" + params.toString());
	};
};
