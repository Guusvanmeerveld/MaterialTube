"use client";

import { PlaylistResult as PlaylistProps } from "@/client/typings/search";
import { Component } from "@/typings/component";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";
import NextImage from "next/image";
import { useMemo } from "react";
import { Link } from "@nextui-org/link";

export const Playlist: Component<{ data: PlaylistProps }> = ({ data }) => {
	const url = `/playlist/${data.id}`;
	const channelUrl = `/channel/${data.author.id}`;

	const videoSize = 200;
	const aspectRatio = 16 / 9;

	const [width, height] = useMemo(() => {
		return [videoSize * aspectRatio, videoSize];
	}, [videoSize]);

	return (
		<NextLink href={url}>
			<Card>
				<CardBody>
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="relative">
							<Image
								width={width}
								height={height}
								className="object-contain"
								src={data.thumbnail}
								alt={data.title}
								as={NextImage}
								unoptimized
							/>
							<p className="text-small rounded-md z-10 absolute bottom-2 right-2 bg-content2 p-1">
								{data.numberOfVideos} videos
							</p>
						</div>

						<div className="flex flex-col gap-2">
							<div>
								<h1 className="text-xl">{data.title}</h1>

								<Link
									as={NextLink}
									href={channelUrl}
									className="flex flex-row gap-2 items-center"
								>
									<h1 className="text-lg text-default-600">
										{data.author.name}
									</h1>
								</Link>
							</div>

							{data.videos && (
								<div className="flex flex-col gap-1">
									{data.videos.map((video) => {
										return <h1>{video.title}</h1>;
									})}
								</div>
							)}
						</div>
					</div>
				</CardBody>
			</Card>
		</NextLink>
	);
};
