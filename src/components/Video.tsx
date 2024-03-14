import { VideoPreview } from "@/client/typings/videoPreview";
import { Component } from "@/typings/component";
import { Card, CardFooter, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import formatViewCount from "@/utils/formatViewCount";
import formatDuration from "@/utils/formatDuration";

export const Video: Component<{ data: VideoPreview }> = ({ data: video }) => {
	const handleContextMenu = () => {};

	return (
		<Link href={`/watch?v=${video.id}`}>
			<Card
				radius="lg"
				onContextMenu={(e) => {
					e.preventDefault();
					handleContextMenu();
				}}
			>
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
							<p className="text-small tracking-tight text-default-400">
								{video.uploaded.toLocaleDateString()}
							</p>

							<p className="text-small tracking-tight text-default-400">
								Views: {formatViewCount(video.views)}
							</p>
						</div>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
};
