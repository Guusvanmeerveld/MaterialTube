"use client";

import { Search as SearchInput } from "@/components/Search";
import { useClient } from "@/hooks/useClient";
import { Component } from "@/typings/component";
import { Spacer } from "@nextui-org/spacer";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Channel } from "./Channel";
import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";
import { Button } from "@nextui-org/button";
import { Video } from "./Video";

export const Search: Component = () => {
	const searchParams = useSearchParams();

	const query = searchParams.get("search_query");

	const client = useClient();

	const { isLoading, error, refetch, data } = useQuery({
		queryKey: ["search", query],
		queryFn: () => {
			if (query === null) return;

			return client.getSearch(query);
		}
	});

	const results = data ?? [];

	return (
		<>
			<Container>
				<SearchInput initialQueryValue={query ?? undefined} />
				<Spacer y={4} />
				{isLoading && <LoadingPage />}
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
					{results.length != 0 &&
						results.map((result) => {
							switch (result.type) {
								case "channel":
									return <Channel key={result.id} data={result} />;

								case "video":
									return <Video key={result.id} data={result} />;

								default:
									break;
							}
						})}
				</div>
			</Container>
		</>
	);
};
