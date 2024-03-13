"use client";

import { Component } from "@/typings/component";
import { useClient } from "@/hooks/useClient";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@nextui-org/button";
import { CircularProgress } from "@nextui-org/progress";

import { Spacer } from "@nextui-org/spacer";
import { VideoCard } from "./VideoCard";

export const Trending: Component = ({}) => {
	const client = useClient();

	const { isLoading, error, refetch, data } = useQuery({
		queryKey: ["trending"],
		queryFn: () => client.getTrending("NL")
	});

	return (
		<div className="container px-4 mx-auto min-h-screen">
			{isLoading && !data && (
				<div className="flex items-center justify-center h-screen">
					<CircularProgress aria-label="Loading trending page..." />
				</div>
			)}
			{error && (
				<div className="flex items-center justify-center h-screen">
					<div className="text-center">
						<h1 className="text-xl">
							An error occurred loading the trending page
						</h1>
						<h2 className="text-lg">{error.toString()}</h2>
						<Spacer y={2} />
						<Button color="primary" onClick={() => refetch()}>
							Retry
						</Button>
					</div>
				</div>
			)}
			{data && (
				<div className="grid gap-4 py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{data.map((video) => (
						<VideoCard key={video.id} data={video} />
					))}
				</div>
			)}
		</div>
	);
};
