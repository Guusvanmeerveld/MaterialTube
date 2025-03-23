"use client";

import { useDebounce } from "use-debounce";

import { useQuery } from "@tanstack/react-query";
import { FC, useMemo, useState } from "react";
import { FiSearch as SearchIcon } from "react-icons/fi";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

import { useClient } from "@/hooks/useClient";

export const Input: FC<{
	query?: string;
	setQuery: (query: string) => void;
}> = ({ setQuery, query }) => {
	const client = useClient();

	const [searchQuery, setSearchQuery] = useState(query ?? "");

	const [searchQueryDebounced] = useDebounce(searchQuery, 250);

	const { isLoading, error, data } = useQuery({
		queryKey: ["search", "suggestions", searchQueryDebounced],
		queryFn: () => {
			if (searchQueryDebounced.length === 0) return [];

			return client.getSearchSuggestions(searchQueryDebounced);
		}
	});

	const suggestions = useMemo(
		() =>
			data?.map((suggestion) => ({
				label: suggestion,
				value: suggestion
			})) ?? [],
		[data]
	);

	return (
		<Autocomplete
			defaultInputValue={query}
			defaultItems={suggestions}
			errorMessage={error !== null ? error.toString() : ""}
			isClearable={false}
			isInvalid={error !== null}
			isLoading={isLoading}
			label="Search"
			name="search_query"
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					setQuery(searchQuery);
				}
			}}
			onSelectionChange={(key) => {
				if (key === null) return;

				setSearchQuery(key.toString());
				setQuery(key.toString());
			}}
			onValueChange={setSearchQuery}
			placeholder="Search for videos"
			required
			startContent={<SearchIcon className="text-xl" />}
			type="text"
			value={searchQuery}
			variant="bordered"
		>
			{(suggestion) => (
				<AutocompleteItem key={suggestion.value}>
					{suggestion.label}
				</AutocompleteItem>
			)}
		</Autocomplete>
	);
};
