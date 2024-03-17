"use client";

import { Component } from "@/typings/component";
import { VideoResult as VideoProps } from "@/client/typings/search";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import NextImage from "next/image";
import { useMemo } from "react";
import formatViewCount from "@/utils/formatViewCount";
import formatUploadedTime from "@/utils/formatUploadedTime";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import formatDuration from "@/utils/formatDuration";

export const Video: Component<{ data: VideoProps }> = ({ data }) => {
	const url = `/watch?v=${data.id}`;
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
								<h1>{formatViewCount(data.views)} views</h1>
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
