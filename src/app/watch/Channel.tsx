"use client";

import NextLink from "next/link";

import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

import { Author } from "@/client/typings/author";
import formatBigNumber from "@/utils/formatBigNumber";
import { channelUrl } from "@/utils/urls";

import { Component } from "@/typings/component";

export const Channel: Component<{
	data: Author;
}> = ({ data }) => {
	const url = data?.id ? channelUrl(data.id) : undefined;

	return (
		<Link as={NextLink} href={url}>
			<div className="flex flex-row gap-4 items-center">
				<Avatar
					isBordered
					size="lg"
					src={data.avatar}
					showFallback
					name={data.name}
				/>
				<div className="flex flex-col">
					<h1 className="text-lg text-default-foreground">{data.name}</h1>
					{data.subscribers && (
						<h2 className="text-md tracking-tight text-default-500">
							{formatBigNumber(data.subscribers)} subscribers
						</h2>
					)}
				</div>
			</div>
		</Link>
	);
};
