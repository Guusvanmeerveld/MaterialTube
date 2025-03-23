import NextImage from "next/image";
import NextLink from "next/link";
import { useMemo } from "react";
import {
	FiCopy as CopyIcon,
	FiLink as LinkIcon,
	FiYoutube as YoutubeIcon
} from "react-icons/fi";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";

import { Video as VideoProps } from "@/client/typings/video";
import formatBigNumber from "@/utils/formatBigNumber";
import formatDuration from "@/utils/formatDuration";
import formatUploadedTime from "@/utils/formatUploadedTime";
import {
	channelUrl,
	videoUrl,
	youtubeChannelUrl,
	youtubeVideoUrl
} from "@/utils/urls";
import { videoSize } from "@/utils/videoSize";

import { ContextMenu } from "./ContextMenu";

import { Component } from "@/typings/component";
import { ContextMenuItem, ContextMenuItemType } from "@/typings/contextMenu";

export const Video: Component<{ data: VideoProps; size?: number }> = ({
	data,
	size = 40
}) => {
	const url = videoUrl(data.id);
	const channel = data.author.id ? channelUrl(data.author.id) : "#";

	const [width, height] = videoSize(size);

	const menuItems = useMemo(() => {
		const hasAuthor = !!data.author.id;

		const items: ContextMenuItem[] = [
			{
				type: ContextMenuItemType.Category,
				title: "Video",
				showDivider: true,
				key: "video",
				items: [
					{
						type: ContextMenuItemType.Action,
						title: "Go to video",
						description: "Opens in this tab",
						icon: <LinkIcon />,
						key: "goToVideo",
						href: url
					},
					{
						type: ContextMenuItemType.Action,
						title: "Copy video id",
						icon: <CopyIcon />,
						key: "videoId",
						onClick: (): void => {
							navigator.clipboard.writeText(data.id);
						}
					},
					{
						type: ContextMenuItemType.Action,
						title: "Copy YouTube video url",
						icon: <YoutubeIcon />,
						key: "youtubeUrl",
						onClick: (): void => {
							const url = youtubeVideoUrl(data.id);

							navigator.clipboard.writeText(url.toString());
						}
					}
				]
			},
			{
				type: ContextMenuItemType.Category,
				title: "Thumbnail",
				showDivider: hasAuthor,
				key: "thumbnail",
				items: [
					{
						type: ContextMenuItemType.Action,
						title: "Open thumbnail",
						description: "Opens in this tab",
						icon: <LinkIcon />,
						key: "thumbnail",
						href: data.thumbnail
					},
					{
						type: ContextMenuItemType.Action,
						title: "Copy thumnail url",
						icon: <CopyIcon />,
						key: "thumbnailUrl",
						onClick: (): void => {
							navigator.clipboard.writeText(data.thumbnail);
						}
					}
				]
			}
		];

		if (data.author.id)
			items.push({
				type: ContextMenuItemType.Category,
				title: "Channel",
				key: "channel",
				items: [
					{
						type: ContextMenuItemType.Action,
						title: "Go to channel",
						description: "Opens in this tab",
						icon: <LinkIcon />,
						key: "goToChannel",
						href: channel
					},
					{
						type: ContextMenuItemType.Action,
						title: "Copy channel id",
						icon: <CopyIcon />,
						key: "channelId",
						onClick: (): void => {
							if (data.author.id) navigator.clipboard.writeText(data.author.id);
						}
					},
					{
						type: ContextMenuItemType.Action,
						title: "Copy YouTube channel url",
						icon: <YoutubeIcon />,
						key: "youtubeUrl",
						onClick: (): void => {
							if (!data.author.id) return;

							const url = youtubeChannelUrl(data.author.id);

							navigator.clipboard.writeText(url.toString());
						}
					}
				]
			});

		return items;
	}, [data, channel, url]);

	return (
		<ContextMenu menu={menuItems}>
			<Card radius="lg" style={{ maxWidth: `${width}px` }}>
				<CardBody>
					<NextLink href={url}>
						<Image
							alt={data.title}
							as={NextImage}
							className="object-contain"
							height={height}
							src={data.thumbnail}
							unoptimized
							width={width}
						/>
					</NextLink>

					<p className="text-small rounded-md z-10 absolute bottom-5 right-5 bg-content2 p-1">
						{formatDuration(data.duration)}
					</p>
				</CardBody>
				<Divider />
				<CardFooter>
					<div className="flex flex-col">
						<div className="flex min-w-0">
							<Link
								as={NextLink}
								className="text-ellipsis overflow-hidden whitespace-nowrap text-foreground"
								href={url}
								title={data.title}
							>
								{data.title}
							</Link>
						</div>
						<div className="flex flex-row gap-2 min-w-0">
							<Link
								as={NextLink}
								className="overflow-ellipsis overflow-hidden whitespace-nowrap text-small font-semibold tracking-tight text-default-400 shrink"
								href={channel}
							>
								{data.author.name}
							</Link>

							{data.uploaded && (
								<Tooltip content={data.uploaded.toLocaleString()} showArrow>
									<p className="text-small tracking-tight text-default-400 shrink-0">
										{formatUploadedTime(data.uploaded)}
									</p>
								</Tooltip>
							)}

							<p className="text-small tracking-tight text-default-400 shrink-0">
								Views: {formatBigNumber(data.views)}
							</p>
						</div>
					</div>
				</CardFooter>
			</Card>
		</ContextMenu>
	);
};
