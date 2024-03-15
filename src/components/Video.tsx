import { Video as VideoProps } from "@/client/typings/video";
import { Component } from "@/typings/component";
import { Card, CardFooter, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import formatViewCount from "@/utils/formatViewCount";
import formatDuration from "@/utils/formatDuration";
import { ContextMenu } from "./ContextMenu";
import formatUploadedTime from "@/utils/formatUploadedTime";
import { Tooltip } from "@nextui-org/tooltip";
import { ContextMenuItem } from "@/typings/contextMenu";

export const Video: Component<{ data: VideoProps }> = ({ data: video }) => {
	const url = `/watch?v=${video.id}`;
	const channelUrl = `/channel/${video.author.id}`;

	const menuItems: ContextMenuItem[] = [
		{ title: "Go to video", key: "gotoVideo", href: url },
		{
			title: "Copy video id",
			key: "videoId",
			onClick: () => {
				navigator.clipboard.writeText(video.id);
			},
			showDivider: true
		},
		{
			title: "Open thumbnail",
			key: "thumbnail",
			href: video.thumbnail
		},
		{
			title: "Copy thumnail url",
			key: "thumbnailUrl",
			onClick: () => {
				navigator.clipboard.writeText(video.thumbnail);
			},
			showDivider: true
		},
		{ title: "Go to channel", key: "gotoChannel", href: channelUrl },
		{
			title: "Copy channel id",
			key: "channelId",
			onClick: () => {
				navigator.clipboard.writeText(video.author.id);
			}
		}
	];

	return (
		<Link href={url}>
			<ContextMenu menu={menuItems}>
				<Card radius="lg">
					<CardBody>
						<Image
							alt={video.title}
							className="object-cover"
							height={400}
							src={video.thumbnail}
							width={600}
						/>
						<p className="text-small rounded-md z-10 absolute bottom-5 right-5 bg-content2 p-1">
							{formatDuration(video.duration)}
						</p>
					</CardBody>
					<Divider />
					<CardFooter>
						<div className="max-w-full">
							<p title={video.title} className="truncate">
								{video.title}
							</p>
							<div className="flex flex-row gap-2 justify-start overflow-scroll">
								<p className="text-small font-semibold tracking-tight text-default-400">
									{video.author.name}
								</p>
								<Tooltip showArrow content={video.uploaded.toLocaleString()}>
									<p className="text-small tracking-tight text-default-400">
										{formatUploadedTime(video.uploaded)}
									</p>
								</Tooltip>

								<p className="text-small tracking-tight text-default-400">
									Views: {formatViewCount(video.views)}
								</p>
							</div>
						</div>
					</CardFooter>
				</Card>
			</ContextMenu>
		</Link>
	);
};
