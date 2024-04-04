import NextLink from "next/link";
import { FC } from "react";
import { FiCheckCircle as VerifiedIcon } from "react-icons/fi";

import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

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
						isBordered
						name={data.name}
						showFallback
						size="lg"
						src={data.avatar}
						alt={data.name}
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
