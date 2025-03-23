import NextLink from "next/link";
import { FC } from "react";
import { FiCheckCircle as VerifiedIcon } from "react-icons/fi";

import { Avatar } from "@heroui/avatar";
import { Link } from "@heroui/link";

import { Author as AuthorProps } from "@/client/typings/author";
import formatBigNumber from "@/utils/formatBigNumber";
import { channelUrl } from "@/utils/urls";

export const Author: FC<{ data: AuthorProps }> = ({ data }) => {
	const url = data.id ? channelUrl(data.id) : "#";

	return (
		<div className="flex flex-row gap-4 items-center">
			{data.avatar && (
				<Link as={NextLink} href={url}>
					<Avatar
						alt={data.name}
						isBordered
						name={data.name}
						showFallback
						size="lg"
						src={data.avatar}
					/>
				</Link>
			)}
			<div className="flex flex-col">
				<Link as={NextLink} href={url}>
					<div className="flex flex-row gap-1 items-center">
						<p className="text-lg text-default-600">{data.name}</p>
						<VerifiedIcon className="text-success" />
					</div>
				</Link>

				{data.subscribers && (
					<p className="text-default-400 tracking-tight">
						{formatBigNumber(data.subscribers)} subscribers
					</p>
				)}
			</div>
		</div>
	);
};
