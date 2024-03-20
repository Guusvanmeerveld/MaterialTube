"use client";

import { Search as SearchInput } from "@/components/Search";
import { useClient } from "@/hooks/useClient";
import { Component } from "@/typings/component";
import { Spacer } from "@nextui-org/spacer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Channel } from "./Channel";
import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";
import { Button } from "@nextui-org/button";
import { Video } from "./Video";
import { Playlist } from "./Playlist";
import { Fragment, useCallback } from "react";
import { CircularProgress } from "@nextui-org/progress";
import { useVisibility } from "reactjs-visibility";
import { Loading } from "./Loading";

export const Search: Component = () => {
	const searchParams = useSearchParams();

	const query = searchParams.get("search_query");

	const client = useClient();

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		refetch,
		isFetching,
		isFetchingNextPage
	} = useInfiniteQuery({
		queryKey: ["search", query],
		queryFn: async ({ pageParam }) => {
			return await client.getSearch(query ?? "", { pageParam: pageParam });
		},
		enabled: query !== null,
		initialPageParam: "",
		getNextPageParam: (lastPage, pages) => lastPage.nextCursor
	});

	const handleUserReachedPageEnd = useCallback(
		(visiblity: boolean) => {
			console.log(visiblity);

			console.log(visiblity, !isFetchingNextPage, hasNextPage);

			if (visiblity && !isFetchingNextPage) fetchNextPage();
		},
		[hasNextPage, isFetchingNextPage]
	);

	return (
		<>
			<Container>
				<SearchInput initialQueryValue={query ?? undefined} />
				<Spacer y={4} />
				{isFetching && <LoadingPage />}
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

					<Loading
						isFetching={isFetchingNextPage}
						onVisible={handleUserReachedPageEnd}
					/>

					{/* {!isFetching && !isFetchingNextPage && !error && (
						<Button onClick={() => fetchNextPage()}>Load more</Button>
					)} */}
				</div>
			</Container>
		</>
	);
};
