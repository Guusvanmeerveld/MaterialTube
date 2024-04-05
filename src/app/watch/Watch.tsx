"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
	FiThumbsDown as DislikeIcon,
	FiThumbsUp as LikeIcon,
	FiEye as ViewIcon
} from "react-icons/fi";

import { Chip } from "@nextui-org/chip";

import { useClient } from "@/hooks/useClient";

import formatBigNumber from "@/utils/formatBigNumber";

import { Author } from "@/components/Author";
import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";

import { Comments } from "./Comments";
import { Description } from "./Description";
import { Player } from "./Player";
import { Related } from "./Related";

import { Component } from "@/typings/component";

// TODO: Make all keywords visible in some way
const maxKeyWords = 3;

export const Watch: Component = () => {
	const client = useClient();

	const searchParams = useSearchParams();

	const videoId = searchParams.get("v") as string;

	const videoIdIsInvalid = useMemo(() => videoId === null, [videoId]);

	const { data, isLoading, error } = useQuery({
		queryKey: ["watch", videoId],
		queryFn: () => {
			return client.getWatchable(videoId);
		},
		enabled: !videoIdIsInvalid
	});

	const {
		data: comments,
		isLoading: isLoadingComments,
		refetch: refetchComments,
		error: commentsError
	} = useQuery({
		queryKey: ["comments", videoId],
		queryFn: () => {
			return client.getComments(videoId);
		},
		enabled: !videoIdIsInvalid
	});

	if (error) console.log(error);

	return (
		<Container>
			{isLoading && <LoadingPage />}
			{data && !isLoading && (
				<div className="flex flex-col gap-4">
					<Player streams={data.streams} />
					<div className="flex flex-col xl:flex-row gap-4">
						<div className="flex flex-1 flex-col gap-4">
							<div className="flex flex-col">
								<h1 className="text-2xl">{data.video.title}</h1>
								<div className="flex flex-row gap-4 text-lg tracking-tight text-default-500">
									<div className="flex flex-row gap-1 items-center">
										<ViewIcon />
										<p>{formatBigNumber(data.video.views)} views</p>
									</div>

									<div className="flex flex-row gap-1 items-center">
										<LikeIcon />
										<p>{formatBigNumber(data.likes)} likes</p>
									</div>
									<div className="flex flex-row gap-1 items-center">
										<DislikeIcon />
										<p>{formatBigNumber(data.dislikes)} dislikes</p>
									</div>
								</div>
							</div>

							<Author data={data.video.author} />

							<Description data={data.video.description ?? ""} />

							<div className="flex flex-row gap-2">
								<h1>Category:</h1>
								<h1 className="font-semibold">{data.category}</h1>
							</div>

							{data.keywords.length !== 0 && (
								<div className="flex flex-row gap-2">
									<p>Keywords:</p>
									<div className="flex flex-row gap-2 whitespace-nowrap overflow-x-scroll">
										{data.keywords.slice(0, maxKeyWords).map((keyword) => (
											<Chip key={keyword}>{keyword}</Chip>
										))}
									</div>
								</div>
							)}

							<Comments
								data={comments}
								error={commentsError}
								refetch={refetchComments}
								isLoading={isLoadingComments}
								videoId={data.video.id}
								videoUploader={data.video.author}
							/>
						</div>
						<div className="flex justify-center">
							<Related data={data.related} />
						</div>
					</div>
				</div>
			)}
		</Container>
	);
};
