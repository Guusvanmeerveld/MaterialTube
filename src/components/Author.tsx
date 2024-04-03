import NextLink from "next/link";
import { FC } from "react";

import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

import { Author as AuthorProps } from "@/client/typings/author";
import formatBigNumber from "@/utils/formatBigNumber";
import { channelUrl } from "@/utils/urls";

export const Author: FC<{ data: AuthorProps }> = ({ data }) => {
	return (
		<Link
			as={NextLink}
			href={data.id ? channelUrl(data.id) : undefined}
			className="flex flex-row gap-4 items-center"
		>
			{data.avatar && (
				<Avatar
					isBordered
					name={data.name}
					showFallback
					size="lg"
					src={data.avatar}
					alt={data.name}
				/>
			)}
			<div className="flex flex-col">
				<p className="text-lg text-default-600">{data.name}</p>
				{data.subscribers && (
					<p className="text-default-400 tracking-tight">
						{formatBigNumber(data.subscribers)} subscribers
					</p>
				)}
			</div>
		</Link>
	);
};
