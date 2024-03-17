"use client";

import { useClient } from "@/hooks/useClient";
import { Component } from "@/typings/component";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useQuery } from "@tanstack/react-query";
import { FormEventHandler, useCallback, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import { FiSearch as SearchIcon } from "react-icons/fi";
import { useRouter } from "next/navigation";

export const Search: Component<{ initialQueryValue?: string }> = ({
	initialQueryValue
}) => {
	const client = useClient();

	const [searchQuery, setSearchQuery] = useState(initialQueryValue ?? "");

	const router = useRouter();

	const [searchQueryDebounced] = useDebounce(searchQuery, 250);

	const { isLoading, error, data } = useQuery({
		queryKey: ["search", "suggestions", searchQueryDebounced],
		queryFn: () => {
			if (searchQueryDebounced.length === 0) return [];

			return client.getSearchSuggestions(searchQueryDebounced);
		}
	});

	const submit = useCallback((query: string) => {
		router.push(`/results?search_query=${query}`);
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
				isClearable
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
				variant="bordered"
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
