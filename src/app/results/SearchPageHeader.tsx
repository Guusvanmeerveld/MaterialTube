"use client";

import { FC } from "react";

import { useSearch } from "@/hooks/useSearch";

import { SearchType } from "@/client/typings/search/options";

import { Search as SearchInput } from "@/components/Search";

import { Filter } from "./Filter";

export const SearchPageHeader: FC<{
	query?: string;
	filter?: SearchType;
}> = ({ query, filter }) => {
	const searchFor = useSearch();

	const searchForQuery = (query: string): void => {
		searchFor(query, filter);
	};

	const searchWithFilter = (filter: SearchType): void => {
		if (query) searchFor(query, filter);
	};

	return (
		<div className="flex flex-row gap-2">
			<div className="flex-1">
				<SearchInput query={query} setQuery={searchForQuery} />
			</div>
			<div>
				<Filter filter={filter ?? "all"} setFilter={searchWithFilter} />
			</div>
		</div>
	);
};
