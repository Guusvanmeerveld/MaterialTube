"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Fragment, useCallback, useMemo } from "react";

import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";

import { useClient } from "@/hooks/useClient";
import { useSearch } from "@/hooks/useSearch";

import { SearchType, SearchTypeModel } from "@/client/typings/search/options";

import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";
import { Search as SearchInput } from "@/components/Search";

import { Channel } from "./Channel";
import { Filter } from "./Filter";
import { Loading } from "./Loading";
import { Playlist } from "./Playlist";
import { Video } from "./Video";

import { Component } from "@/typings/component";

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

	const canSearch = !(!!invalidQuery || !!invalidFilter);

	const {
		data,
		error: fetchError,
		fetchNextPage,
		refetch,
		isPending,
		isFetchingNextPage
	} = useInfiniteQuery({
		queryKey: ["search", query, filter],
		queryFn: async ({ pageParam }) => {
			return await client.getSearch(query ?? "", {
				pageParam: pageParam,
				type: filter
			});
		},
		enabled: canSearch,
		initialPageParam: "",
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});

	const error = invalidFilter ?? fetchError ?? undefined;

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
		[isFetchingNextPage, fetchNextPage]
	);

	const hasLoadedData =
		canSearch && data?.pages.flat().length
			? data?.pages.flat().length !== 0
			: false;

	const isLoadingInitialData = canSearch && !isFetchingNextPage && isPending;

	return (
		<>
			<Container>
				<div className="flex flex-row gap-2">
					<div className="flex-1">
						<SearchInput initialQueryValue={query ?? undefined} />
					</div>
					{canSearch && (
						<div>
							<Filter filter={filter} setFilter={setFilter} />
						</div>
					)}
				</div>
				{isLoadingInitialData && <LoadingPage />}
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
				{hasLoadedData && (
					<>
						<div className="flex flex-col gap-4 mt-4">
							{data?.pages.map((page, i) => {
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
						</div>
						<Loading
							isFetching={isFetchingNextPage && !isPending}
							onVisible={handleUserReachedPageEnd}
						/>
					</>
				)}
			</Container>
		</>
	);
};
