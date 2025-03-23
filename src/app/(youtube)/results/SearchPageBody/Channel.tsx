"use client";

import Link from "next/link";
import { FC } from "react";

import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";

import { ChannelItem } from "@/client/typings/item";
import formatBigNumber from "@/utils/formatBigNumber";
import { channelUrl } from "@/utils/urls";

export const Channel: FC<{ data: ChannelItem }> = ({ data }) => {
	const url = channelUrl(data.id);

	return (
		<Card>
			<CardBody>
				<div className="flex flex-row gap-4">
					<Link href={url}>
						<Avatar
							className="w-32 h-32 text-2xl"
							isBordered
							name={data.name}
							src={data.thumbnail}
						/>
					</Link>
					<div className="flex-1 gap-2 flex flex-col justify-center">
						<div className="flex flex-col">
							<Link href={url}>
								<p className="text-lg">{data.name}</p>
							</Link>
							<div className="flex flex-row gap-4 items-center tracking-tight text-default-400">
								<p>{formatBigNumber(data.subscribers)} subscribers</p>
								{data.videos !== 0 && (
									<p>{formatBigNumber(data.videos)} videos</p>
								)}
							</div>
						</div>
						<p className="text-default-600">{data.description}</p>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
