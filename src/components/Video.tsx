import { Video as VideoProps } from "@/client/typings/video";
import { Component } from "@/typings/component";
import { Card, CardFooter, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import formatBigNumber from "@/utils/formatBigNumber";
import formatDuration from "@/utils/formatDuration";
import { ContextMenu } from "./ContextMenu";
import formatUploadedTime from "@/utils/formatUploadedTime";
import { Tooltip } from "@nextui-org/tooltip";
import { ContextMenuItem } from "@/typings/contextMenu";

import NextImage from "next/image";
import { videoSize } from "@/utils/videoSize";

export const Video: Component<{ data: VideoProps }> = ({ data }) => {
	const url = `/watch?v=${data.id}`;
	const channelUrl = `/channel/${data.author.id}`;

	const [width, height] = videoSize([16, 9], 40);

	const menuItems: ContextMenuItem[] = [
		{ title: "Go to video", key: "gotoVideo", href: url },
		{
			title: "Copy video id",
			key: "videoId",
			onClick: () => {
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
			onClick: () => {
				navigator.clipboard.writeText(data.thumbnail);
			},
			showDivider: true
		},
		{ title: "Go to channel", key: "gotoChannel", href: channelUrl },
		{
			title: "Copy channel id",
			key: "channelId",
			onClick: () => {
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
