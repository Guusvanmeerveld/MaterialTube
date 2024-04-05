"use client";

import NextImage from "next/image";
import NextLink from "next/link";
import { FC } from "react";

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

import { PlaylistItem } from "@/client/typings/item";
import { videoUrl } from "@/utils/urls";
import { videoSize } from "@/utils/videoSize";

import { Author } from "@/components/Author";

import { imageSize } from "./constants";

export const Playlist: FC<{ data: PlaylistItem }> = ({ data }) => {
	const url = `/playlist/${data.id}`;

	const [width, height] = videoSize(imageSize);

	const [playlistItemWidth, playlistItemHeight] = videoSize(5);

	return (
		<Card>
			<CardBody>
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="relative">
						<NextLink href={url}>
							<Image
								width={width}
								height={height}
								className="object-contain"
								src={data.thumbnail}
								alt={data.title}
								as={NextImage}
								unoptimized
							/>
						</NextLink>
						<p className="text-small rounded-md z-10 absolute bottom-2 right-2 bg-content2 p-1">
							{data.numberOfVideos} videos
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<Link as={NextLink} href={url}>
							<h1 className="text-xl text-default-foreground">{data.title}</h1>
						</Link>

						<Author data={data.author} />

						{data.videos && (
							<Listbox>
								{data.videos.slice(0, 2).map((video) => (
									<ListboxItem
										as={NextLink}
										startContent={
											<Image
												alt={video.title}
												src={video.thumbnail}
												height={playlistItemHeight}
												width={playlistItemWidth}
											/>
										}
										key={video.id}
										href={videoUrl(video.id)}
									>
										{video.title}
									</ListboxItem>
								))}
							</Listbox>
						)}
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
