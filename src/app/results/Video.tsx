"use client";

import { Component } from "@/typings/component";
import { VideoItem } from "@/client/typings/item";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import NextImage from "next/image";
import formatBigNumber from "@/utils/formatBigNumber";
import formatUploadedTime from "@/utils/formatUploadedTime";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import formatDuration from "@/utils/formatDuration";
import { videoSize } from "@/utils/videoSize";

export const Video: Component<{ data: VideoItem }> = ({ data }) => {
	const url = `/watch?v=${data.id}`;
	const channelUrl = `/channel/${data.author.id}`;

	const [width, height] = videoSize([16, 9], 30);

	return (
		<NextLink href={url}>
			<Card>
				<CardBody>
					<div className="flex flex-row gap-4">
						<div className="relative">
							<Image
								width={width}
								height={height}
								src={data.thumbnail}
								alt={data.title}
								as={NextImage}
								unoptimized
							/>
							<p className="text-small rounded-md z-10 absolute bottom-2 right-2 bg-content2 p-1">
								{formatDuration(data.duration)}
							</p>
							{data.live && (
								<p className="text-small rounded-md z-10 absolute bottom-2 left-2 bg-danger p-1">
									LIVE
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<h1 className="text-xl">{data.title}</h1>
							<div className="flex flex-row gap-4 items-center font-semibold text-default-600">
								<h1>{formatBigNumber(data.views)} views</h1>
								<h1>{formatUploadedTime(data.uploaded)}</h1>
							</div>
							<Link
								as={NextLink}
								href={channelUrl}
								className="flex flex-row gap-2 items-center"
							>
								{data.author.avatar && (
									<Image
										width={64}
										height={64}
										src={data.author.avatar}
										alt={data.author.name}
										className="rounded-full"
										as={NextImage}
										unoptimized
									/>
								)}
								<h1 className="text-lg text-default-600">{data.author.name}</h1>
							</Link>
							<p className="text-default-600">{data.description}</p>
						</div>
					</div>
				</CardBody>
			</Card>
		</NextLink>
	);
};
