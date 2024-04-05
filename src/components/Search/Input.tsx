"use client";

import { useDebounce } from "use-debounce";

import { useQuery } from "@tanstack/react-query";
import { FC, useMemo, useState } from "react";
import { FiSearch as SearchIcon } from "react-icons/fi";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

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
			isClearable={false}
			name="search_query"
			value={searchQuery}
			isLoading={isLoading}
			defaultInputValue={query}
			onValueChange={setSearchQuery}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					setQuery(searchQuery);
				}
			}}
			startContent={<SearchIcon className="text-xl" />}
			defaultItems={suggestions}
			onSelectionChange={(key) => {
				if (key === null) return;

				setSearchQuery(key.toString());
				setQuery(key.toString());
			}}
			errorMessage={error !== null ? error.toString() : ""}
			isInvalid={error !== null}
			required
			type="text"
			label="Search"
			variant="bordered"
			placeholder="Search for videos"
		>
			{(suggestion) => (
				<AutocompleteItem key={suggestion.value}>
					{suggestion.label}
				</AutocompleteItem>
			)}
		</Autocomplete>
	);
};
