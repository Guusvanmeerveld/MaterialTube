"use client";

import NextImage from "next/image";
import Link from "next/link";
import { FC } from "react";

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { ChannelItem } from "@/client/typings/item";
import formatBigNumber from "@/utils/formatBigNumber";

export const Channel: FC<{ data: ChannelItem }> = ({ data }) => {
	const url = `/channel/${data.id}`;

	const imageSize = 200;

	return (
		<Link href={url}>
			<Card>
				<CardBody>
					<div className="flex flex-row gap-4">
						<Image
							width={imageSize}
							height={imageSize}
							src={data.thumbnail}
							alt={data.name}
							as={NextImage}
							className="rounded-full"
							unoptimized
						/>

						<div className="flex-1 flex flex-col justify-center">
							<h1 className="text-lg">{data.name}</h1>
							<div className="flex flex-row gap-4 items-center font-semibold text-default-600">
								<h1>{formatBigNumber(data.subscribers)} subscribers</h1>
								{data.videos !== 0 && (
									<h1>{formatBigNumber(data.videos)} videos</h1>
								)}
							</div>
							<p className="text-default-600">{data.description}</p>
						</div>
					</div>
				</CardBody>
			</Card>
		</Link>
	);
};
