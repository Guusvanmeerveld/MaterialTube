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
		queryFn: async ({ pageParam }) => {
			return await client.getSearch(query, {
				pageParam: pageParam,
				type: filter
			});
		},
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
			{error !== null && <ErrorPage data={error} refetch={refetch} />}
			{isFetchingInitialData && (
				<LoadingPage text={`Fetching search results for query \`${query}\``} />
			)}
			{error === null && data && (
				<div className="flex flex-col gap-4 mt-4">
					{data.pages.map((page, i) => {
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
					<LoadingNextPage
						isFetching={isFetchingNewPage}
						onVisible={fetchNewData}
					/>
				</div>
			)}
		</>
	);
};
