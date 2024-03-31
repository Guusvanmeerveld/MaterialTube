"use client";

import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";

import { SearchType, SearchTypeModel } from "@/client/typings/search/options";

import { Container } from "@/components/Container";

import { SearchPageBody } from "./SearchPageBody";
import { SearchPageHeader } from "./SearchPageHeader";

export const SearchPage: FC = () => {
	const searchParams = useSearchParams();

	const query = useMemo(() => {
		const param = searchParams.get("search_query");

		if (param === null || param.length === null) return;

		return param;
	}, [searchParams]);

	const filter: SearchType = useMemo(() => {
		const param = searchParams.get("filter");

		const parsed = SearchTypeModel.safeParse(param);

		if (!parsed.success) return "all";

		return parsed.data;
	}, [searchParams]);

	return (
		<>
			<Container>
				<SearchPageHeader query={query} filter={filter} />
				{query && <SearchPageBody query={query} filter={filter} />}
			</Container>
		</>
	);
};
