"use client";

import { Search } from "@/components/Search";
import { Component } from "@/typings/component";
import { useSearchParams } from "next/navigation";

export const SearchPage: Component = () => {
	const searchParams = useSearchParams();

	const query = searchParams.get("search_query");

	return (
		<>
			<Search initialQueryValue={query || undefined} />
		</>
	);
};
