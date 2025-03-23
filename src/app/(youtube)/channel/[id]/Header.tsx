import NextImage from "next/image";
import { FC, useMemo } from "react";

import { Avatar } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Tab, Tabs } from "@heroui/tabs";

import { Channel } from "@/client/typings/channel";
import formatBigNumber from "@/utils/formatBigNumber";
import { videoSize } from "@/utils/videoSize";

export const Header: FC<{ data: Channel }> = ({ data }) => {
	console.log(data);

	const tabItems = useMemo(
		() => [
			{ id: "videos", label: "Videos" },
			{ id: "shorts", label: "Shorts" },
			{ id: "livestreams", label: "Livestreams" },
			{ id: "playlists", label: "Playlists" }
		],
		[]
	);

	// Original aspect ratio received when requesting a banner from youtube.
	const [bannerWidth, bannerHeight] = videoSize(1, [2490, 413]);

	return (
		<>
			<Image
				alt="Channel banner"
				as={NextImage}
				className="w-full h-full top-0 left-0 object-cover rounded-2xl"
				height={bannerHeight}
				src={data.banner ?? ""}
				unoptimized
				width={bannerWidth}
			/>

			<Divider className="my-6" />

			<div className="flex flex-row gap-4 items-center">
				<Avatar
					alt={data.name}
					className="w-24 h-24 text-large"
					isBordered
					name={data.name}
					showFallback
					src={data.avatar}
				/>
				<div className="flex flex-col gap-2">
					<h1 className="text-4xl">{data.name}</h1>
					<h2 className="text-xl tracking-tight text-default-500">
						{formatBigNumber(data.subscribers)} subscribers
					</h2>
				</div>
			</div>

			<h2 className="mt-4">{data.description}</h2>

			<Divider className="my-6" />

			<Tabs aria-label="Dynamic tabs" items={tabItems}>
				{(item) => <Tab key={item.id} title={item.label} />}
			</Tabs>
		</>
	);
};
