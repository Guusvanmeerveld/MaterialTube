import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, Fragment, useCallback } from "react";

import { useClient } from "@/hooks/useClient";

import { SearchType } from "@/client/typings/search/options";

import { LoadingPage } from "@/components/LoadingPage";

import { ErrorPage } from "../ErrorPage";
import { Channel } from "./Channel";
import { LoadingNextPage } from "./LoadingNextPage";
import { Playlist } from "./Playlist";
import { Video } from "./Video";

export const SearchPageBody: FC<{ query: string; filter: SearchType }> = ({
	filter,
	query
}) => {
	const client = useClient();

	const {
		data,
		error,
		fetchNextPage,
		refetch,
		isPending: isFetchingInitialData,
		isFetchingNextPage
	} = useInfiniteQuery({
		queryKey: ["search", query, filter],
		queryFn: async ({ pageParam }) =>
			await client.getSearch(query, {
				pageParam: pageParam,
				type: filter
			}),
		initialPageParam: "",
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});

	const isFetchingNewPage = isFetchingNextPage && !isFetchingInitialData;

	const fetchNewData = useCallback(
		(visiblity: boolean) => {
			if (visiblity && !isFetchingNextPage) fetchNextPage();
		},
		[isFetchingNextPage, fetchNextPage]
	);

	return (
		<>
			{isFetchingInitialData && (
				<LoadingPage text={`Fetching search results for query \`${query}\``} />
			)}
			{data && (
				<div className="flex flex-col gap-4 mt-4">
					{data.pages.flatMap((page) =>
						page.items.map((result) => {
							switch (result.type) {
								case "channel":
									return <Channel data={result} key={result.id} />;

								case "video":
									return <Video data={result} key={result.id} />;

								case "playlist":
									return <Playlist data={result} key={result.id} />;
							}
						})
					)}
					{error === null && (
						<LoadingNextPage
							isFetching={isFetchingNewPage}
							onVisible={fetchNewData}
						/>
					)}
				</div>
			)}
			{error !== null && <ErrorPage data={error} refetch={refetch} />}
		</>
	);
};
