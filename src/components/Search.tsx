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
		queryFn: () => client.getSearchSuggestions(searchQueryDebounced),
		enabled: searchQueryDebounced.length !== 0
	});

	const handleSubmit = useCallback(() => {
		router.push(`/results?search_query=${searchQuery}`);
	}, [searchQuery]);

	const suggestions = useMemo(
		() =>
			data?.map((suggestion) => ({
				label: suggestion,
				value: suggestion
			})) ?? [],
		[data]
	);

	return (
		<form onSubmit={handleSubmit}>
			<Autocomplete
				isClearable
				name="search-bar"
				value={searchQuery}
				isLoading={isLoading}
				defaultInputValue={initialQueryValue}
				onValueChange={setSearchQuery}
				startContent={<SearchIcon className="text-xl" />}
				defaultItems={suggestions}
				onSelectionChange={(key) => {
					if (key === null) return;

					setSearchQuery(key.toString());
					handleSubmit();
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
