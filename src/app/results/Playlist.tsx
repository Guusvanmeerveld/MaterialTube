"use client";

import NextImage from "next/image";
import NextLink from "next/link";

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

import { PlaylistItem } from "@/client/typings/item";
import { videoSize } from "@/utils/videoSize";

import { Component } from "@/typings/component";

export const Playlist: Component<{ data: PlaylistItem }> = ({ data }) => {
	const url = `/playlist/${data.id}`;
	const channelUrl = `/channel/${data.author.id}`;

	const [width, height] = videoSize([16, 9], 30);

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
									{data.videos.map((video) => (
										<h1 key={video.id}>{video.title}</h1>
									))}
								</div>
							)}
						</div>
					</div>
				</CardBody>
			</Card>
		</NextLink>
	);
};
