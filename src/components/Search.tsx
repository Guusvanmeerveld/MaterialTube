"use client";

import { useClient } from "@/hooks/useClient";
import { Component } from "@/typings/component";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useQuery } from "@tanstack/react-query";
import { FormEventHandler, useState } from "react";
import { useDebounce } from "use-debounce";

export const Search: Component<{ initialQueryValue?: string }> = ({
	initialQueryValue
}) => {
	const client = useClient();

	const [searchQuery, setSearchQuery] = useState(initialQueryValue ?? "");

	const [searchQueryDebounced] = useDebounce(searchQuery, 500);

	const { isLoading, error, data } = useQuery({
		queryKey: ["search", "suggestions", searchQueryDebounced],
		queryFn: () => client.getSearchSuggestions(searchQueryDebounced),
		enabled: searchQueryDebounced.length !== 0
	});

	const handleSubmit: FormEventHandler = (e) => {
		// e.preventDefault();

		console.log(searchQuery);
	};

	const suggestions = data ?? [];

	return (
		<Autocomplete
			isClearable
			value={searchQuery}
			isLoading={isLoading}
			defaultInputValue={initialQueryValue}
			onSubmit={handleSubmit}
			onValueChange={setSearchQuery}
			label="Search"
			variant="flat"
			placeholder="Search for videos"
		>
			{suggestions.map((suggestion) => (
				<AutocompleteItem key={suggestion.toLowerCase()}>
					{suggestion}
				</AutocompleteItem>
			))}
		</Autocomplete>
	);
};
