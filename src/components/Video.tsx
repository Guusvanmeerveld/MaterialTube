import NextImage from "next/image";
import Link from "next/link";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";

import { Video as VideoProps } from "@/client/typings/video";
import formatBigNumber from "@/utils/formatBigNumber";
import formatDuration from "@/utils/formatDuration";
import formatUploadedTime from "@/utils/formatUploadedTime";
import { channelUrl, videoUrl } from "@/utils/urls";
import { videoSize } from "@/utils/videoSize";

import { ContextMenu } from "./ContextMenu";

import { Component } from "@/typings/component";
import { ContextMenuItem } from "@/typings/contextMenu";

export const Video: Component<{ data: VideoProps }> = ({ data }) => {
	const url = videoUrl(data.id);

	const [width, height] = videoSize([16, 9], 40);

	const menuItems: ContextMenuItem[] = [
		{ title: "Go to video", key: "gotoVideo", href: url },
		{
			title: "Copy video id",
			key: "videoId",
			onClick: (): void => {
				navigator.clipboard.writeText(data.id);
			},
			showDivider: true
		},
		{
			title: "Open thumbnail",
			key: "thumbnail",
			href: data.thumbnail
		},
		{
			title: "Copy thumnail url",
			key: "thumbnailUrl",
			onClick: (): void => {
				navigator.clipboard.writeText(data.thumbnail);
			},
			showDivider: true
		},
		{
			title: "Go to channel",
			key: "gotoChannel",
			href: channelUrl(data.author.id)
		},
		{
			title: "Copy channel id",
			key: "channelId",
			onClick: (): void => {
				navigator.clipboard.writeText(data.author.id);
			}
		}
	];

	return (
		<Link href={url}>
			<ContextMenu menu={menuItems}>
				<Card radius="lg">
					<CardBody>
						<Image
							as={NextImage}
							height={height}
							width={width}
							unoptimized
							alt={data.title}
							className="object-contain aspect"
							src={data.thumbnail}
						/>

						<p className="text-small rounded-md z-10 absolute bottom-5 right-5 bg-content2 p-1">
							{formatDuration(data.duration)}
						</p>
					</CardBody>
					<Divider />
					<CardFooter>
						<div className="max-w-full">
							<p title={data.title} className="truncate">
								{data.title}
							</p>
							<div className="flex flex-row gap-2 justify-start overflow-scroll">
								<p className="text-small font-semibold tracking-tight text-default-400">
									{data.author.name}
								</p>
								<Tooltip showArrow content={data.uploaded.toLocaleString()}>
									<p className="text-small tracking-tight text-default-400">
										{formatUploadedTime(data.uploaded)}
									</p>
								</Tooltip>

								<p className="text-small tracking-tight text-default-400">
									Views: {formatBigNumber(data.views)}
								</p>
							</div>
						</div>
					</CardFooter>
				</Card>
			</ContextMenu>
		</Link>
	);
};
