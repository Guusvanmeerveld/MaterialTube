"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Chip } from "@nextui-org/chip";

import { useClient } from "@/hooks/useClient";

import formatBigNumber from "@/utils/formatBigNumber";

import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";

import { Channel } from "./Channel";
import { Description } from "./Description";
import { Player } from "./Player";
import { Related } from "./Related";

import { Component } from "@/typings/component";

export const Watch: Component = () => {
	const client = useClient();

	const searchParams = useSearchParams();

	const videoId = searchParams.get("v") as string;

	const videoIdIsInvalid = useMemo(() => videoId === null, [videoId]);

	const { data, isLoading, error } = useQuery({
		queryKey: ["watch", videoId],
		queryFn: () => {
			return client.getStream(videoId);
		},
		enabled: !videoIdIsInvalid
	});

	if (error) console.log(error);

	return (
		<Container>
			{isLoading && <LoadingPage />}
			{data && !isLoading && (
				<div className="flex flex-col">
					<Player />
					<div className="flex flex-col xl:flex-row gap-4">
						<div className="flex-1 flex flex-col gap-4">
							<div className="flex flex-col">
								<h1 className="text-2xl">{data.video.title}</h1>
								<div className="flex flex-row gap-4 text-lg tracking-tight text-default-500">
									<h2>{formatBigNumber(data.video.views)} views</h2>

									<h2>{formatBigNumber(data.likes)} likes</h2>
									<h2>{formatBigNumber(data.dislikes)} dislikes</h2>
								</div>
							</div>

							<Channel data={data.video.author} />

							<Description data={data.video.description ?? ""} />

							<div className="flex flex-row gap-2">
								<h1>Category:</h1>
								<h1 className="font-semibold">{data.category}</h1>
							</div>

							{data.keywords.length !== 0 && (
								<div className="flex flex-row gap-2 items-center flex-wrap">
									<h1>Keywords:</h1>
									{data.keywords.map((keyword) => (
										<Chip key={keyword}>{keyword}</Chip>
									))}
								</div>
							)}

							<h1 className="text-xl">Comments</h1>
						</div>
						<Related data={data.related} />
					</div>
				</div>
			)}
		</Container>
	);
};
