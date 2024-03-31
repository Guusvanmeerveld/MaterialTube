"use client";

import NextImage from "next/image";
import NextLink from "next/link";
import { FC } from "react";

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

import { VideoItem } from "@/client/typings/item";
import formatBigNumber from "@/utils/formatBigNumber";
import formatDuration from "@/utils/formatDuration";
import formatUploadedTime from "@/utils/formatUploadedTime";
import { videoUrl } from "@/utils/urls";
import { videoSize } from "@/utils/videoSize";

import { Author } from "@/components/Author";

import { imageSize } from "./constants";

export const Video: FC<{ data: VideoItem }> = ({ data }) => {
	const url = videoUrl(data.id);

	const [width, height] = videoSize(imageSize);

	return (
		<Card>
			<CardBody>
				<div className="flex flex-row gap-4">
					<div className="relative">
						<NextLink href={url}>
							<Image
								width={width}
								height={height}
								src={data.thumbnail}
								alt={data.title}
								as={NextImage}
								unoptimized
							/>
						</NextLink>

						<p className="text-small rounded-md z-10 absolute bottom-2 right-2 bg-content2 p-1">
							{formatDuration(data.duration)}
						</p>
						{data.live && (
							<p className="text-small rounded-md z-10 absolute bottom-2 left-2 bg-danger p-1">
								LIVE
							</p>
						)}
					</div>

					<div className="flex flex-col gap-2 w-full">
						<div>
							<Link as={NextLink} href={url}>
								<h1 className="text-xl text-default-foreground">
									{data.title}
								</h1>
							</Link>
							<div className="flex flex-row gap-4 items-center tracking-tight text-default-400">
								<h1>{formatBigNumber(data.views)} views</h1>
								{data.uploaded && <h1>{formatUploadedTime(data.uploaded)}</h1>}
							</div>
						</div>
						<Author data={data.author} />
						<p className="text-default-600">{data.description}</p>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
