import { Component } from "@/typings/component";
import { VideoResult as VideoProps } from "@/client/typings/search";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import NextImage from "next/image";
import { useMemo } from "react";
import Link from "next/link";

export const Video: Component<{ data: VideoProps }> = ({ data }) => {
	const url = `/watch?v=${data.id}`;

	const videoSize = 200;
	const aspectRatio = 16 / 9;

	const [width, height] = useMemo(() => {
		return [videoSize * aspectRatio, videoSize];
	}, [videoSize]);

	return (
		<Link href={url}>
			<Card>
				<CardBody>
					<div className="flex flex-row gap-4">
						<Image
							width={width}
							height={height}
							src={data.thumbnail}
							alt={data.title}
							as={NextImage}
							unoptimized
							className="aspect-video"
						/>
						<div className="flex flex-col gap-2">
							<h1 className="text-xl">{data.title}</h1>
						</div>
					</div>
				</CardBody>
			</Card>
		</Link>
	);
};
