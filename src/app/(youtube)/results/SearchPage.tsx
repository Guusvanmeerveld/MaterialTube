"use client";

import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";

import { SearchType, SearchTypeModel } from "@/client/typings/search/options";

import { Container } from "@/components/Container";
import { Search } from "@/components/Search";

import { SearchPageBody } from "./SearchPageBody";

export const SearchPage: FC = () => {
	const searchParams = useSearchParams();

	const query = useMemo(() => {
		const param = searchParams.get("search_query");

		if (param === null || param.length === 0) return;

		return param;
	}, [searchParams]);

	const filter: SearchType = useMemo(() => {
		const param = searchParams.get("filter");

		const parsed = SearchTypeModel.safeParse(param);

		if (!parsed.success) return "all";

		return parsed.data;
	}, [searchParams]);

	return (
		<Container>
			<Search filter={filter} query={query} />
			{query && <SearchPageBody filter={filter} query={query} />}
		</Container>
	);
};
