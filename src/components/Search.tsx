"use client";

import { useClient } from "@/hooks/useClient";
import { Component } from "@/typings/component";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { FiSearch as SearchIcon } from "react-icons/fi";
import { useSearch } from "@/hooks/useSearch";

export const Search: Component<{
	initialQueryValue?: string;
}> = ({ initialQueryValue }) => {
	const client = useClient();

	const [searchQuery, setSearchQuery] = useState(initialQueryValue ?? "");

	const searchFor = useSearch();

	const [searchQueryDebounced] = useDebounce(searchQuery, 250);

	const { isLoading, error, data } = useQuery({
		queryKey: ["search", "suggestions", searchQueryDebounced],
		queryFn: () => {
			if (searchQueryDebounced.length === 0) return [];

			return client.getSearchSuggestions(searchQueryDebounced);
		}
	});

	const submit = useCallback((query: string) => {
		searchFor(query);
	}, []);

	const suggestions = useMemo(
		() =>
			data?.map((suggestion) => ({
				label: suggestion,
				value: suggestion
			})) ?? [],
		[data]
	);

	return (
		<form onSubmit={() => submit(searchQuery)}>
			<Autocomplete
				isClearable={false}
				name="search_query"
				value={searchQuery}
				isLoading={isLoading}
				defaultInputValue={initialQueryValue}
				onValueChange={setSearchQuery}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						submit(searchQuery);
					}
				}}
				startContent={<SearchIcon className="text-xl" />}
				defaultItems={suggestions}
				onSelectionChange={(key) => {
					if (key === null) return;

					setSearchQuery(key.toString());
					submit(key.toString());
				}}
				errorMessage={error !== null ? error.toString() : ""}
				isInvalid={error !== null}
				required
				type="text"
				label="Search"
				variant="flat"
				placeholder="Search for videos"
			>
				{(suggestion) => (
					<AutocompleteItem key={suggestion.value}>
						{suggestion.label}
					</AutocompleteItem>
				)}
			</Autocomplete>
		</form>
	);
};
