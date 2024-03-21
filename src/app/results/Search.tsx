"use client";

import { Search as SearchInput } from "@/components/Search";
import { useClient } from "@/hooks/useClient";
import { Component } from "@/typings/component";
import { Spacer } from "@nextui-org/spacer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Channel } from "./Channel";
import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";
import { Button } from "@nextui-org/button";
import { Video } from "./Video";
import { Playlist } from "./Playlist";
import { Fragment, useCallback, useMemo } from "react";
import { Loading } from "./Loading";
import { Filter } from "./Filter";
import { useSearchParams } from "next/navigation";
import { SearchType, SearchTypeModel } from "@/client/typings/search/options";
import { useSearch } from "@/hooks/useSearch";

export const Search: Component = () => {
	const client = useClient();

	const searchParams = useSearchParams();

	const query = searchParams.get("search_query") as string;

	const invalidQuery = useMemo(() => {
		if (query === null || query.length === 0)
			return new Error(`The required parameter 'query' is missing`);
	}, [query]);

	const filter = (searchParams.get("filter") ?? "all") as SearchType;

	const invalidFilter = useMemo(() => {
		const parsed = SearchTypeModel.safeParse(filter);

		if (!parsed.success)
			return new Error(`The provided filter \`${filter}\` is invalid`);
	}, [filter]);

	const {
		data,
		error: fetchError,
		fetchNextPage,
		hasNextPage,
		refetch,
		isFetching,
		isFetchingNextPage
	} = useInfiniteQuery({
		queryKey: ["search", query, filter],
		queryFn: async ({ pageParam }) => {
			return await client.getSearch(query ?? "", {
				pageParam: pageParam,
				type: filter
			});
		},
		enabled: !!invalidQuery || !!invalidFilter,
		initialPageParam: "",
		getNextPageParam: (lastPage, pages) => lastPage.nextCursor
	});

	const error = invalidQuery ?? invalidFilter ?? fetchError ?? undefined;

	const searchFor = useSearch();

	const setFilter = useCallback(
		(filter: SearchType) => {
			searchFor(query, filter);
		},
		[query, searchFor]
	);

	const handleUserReachedPageEnd = useCallback(
		(visiblity: boolean) => {
			if (visiblity && !isFetchingNextPage) fetchNextPage();
		},
		[hasNextPage, isFetchingNextPage, fetchNextPage]
	);

	return (
		<>
			<Container>
				<div className="flex flex-row gap-2">
					<div className="flex-1">
						<SearchInput initialQueryValue={query ?? undefined} />
					</div>
					<div>
						<Filter filter={filter} setFilter={setFilter} />
					</div>
				</div>
				<Spacer y={4} />
				{isFetching && !error && <LoadingPage />}
				{error && (
					<div className="flex-1 flex items-center justify-center">
						<div className="text-center">
							<h1 className="text-xl">
								An error occurred loading the search page
							</h1>
							<h2 className="text-lg">{error.toString()}</h2>
							<Spacer y={2} />
							<Button color="primary" onClick={() => refetch()}>
								Retry
							</Button>
						</div>
					</div>
				)}
				<div className="flex flex-col gap-4">
					{!error &&
						data?.pages.map((page, i) => {
							return (
								<Fragment key={i}>
									{page.items.map((result) => {
										switch (result.type) {
											case "channel":
												return <Channel key={result.id} data={result} />;

											case "video":
												return <Video key={result.id} data={result} />;

											case "playlist":
												return <Playlist key={result.id} data={result} />;
										}
									})}
								</Fragment>
							);
						})}

					<Loading
						isFetching={isFetchingNextPage}
						onVisible={handleUserReachedPageEnd}
					/>
				</div>
			</Container>
		</>
	);
};
