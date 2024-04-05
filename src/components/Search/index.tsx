"use client";

import { FC } from "react";

import { useSearch } from "@/hooks/useSearch";

import { SearchType } from "@/client/typings/search/options";

import { Filter } from "./Filter";
import { Input } from "./Input";

export const Search: FC<{
	query?: string;
	filter?: SearchType;
	onSearch?: (query: string, filter: SearchType) => void;
}> = ({ query = "", filter = "all", onSearch }) => {
	const searchFor = useSearch();

	const searchForQuery = (query: string): void => {
		searchFor(query, filter);
		if (onSearch) onSearch(query, filter);
	};

	const searchWithFilter = (filter: SearchType): void => {
		searchFor(query, filter);
		if (onSearch) onSearch(query, filter);
	};

	return (
		<form>
			<div className="flex flex-row gap-2">
				<div className="flex-1">
					<Input query={query} setQuery={searchForQuery} />
				</div>
				<div>
					<Filter filter={filter} setFilter={searchWithFilter} />
				</div>
			</div>
		</form>
	);
};
