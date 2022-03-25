import axios, { AxiosError } from "axios";

import Link from "next/link";
import { useRouter } from "next/router";

import { FC, useEffect } from "react";

import { useInView } from "react-intersection-observer/";
import { useQuery } from "react-query";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { abbreviateNumber } from "@src/utils";

import { Video as VideoModel } from "@interfaces/video";

import { useSettings } from "@utils/hooks";

interface Channel {
	authorThumbnails: { url: string; width: number; height: number }[];
}

const Video: FC<VideoModel> = ({
	thumbnail,
	title,
	id,
	author,
	views,
	published
}) => {
	const [settings] = useSettings();

	const { isLoading, error, data, refetch, isFetched } = useQuery<
		Channel,
		AxiosError<Error>
	>(
		["channelData", author.id],
		() =>
			axios
				.get(
					`https://${settings.invidiousServer}/api/v1/channels/${author.id}`,
					{
						params: {
							fields: ["authorThumbnails"].join(",")
						}
					}
				)
				.then((res) => res.data),
		{ enabled: false }
	);

	const { ref, inView } = useInView({
		threshold: 0
	});

	const router = useRouter();

	useEffect(() => {
		if (inView && !isFetched) refetch();
	}, [inView, isFetched, refetch]);

	return (
		<Card sx={{ width: "100%" }}>
			<CardActionArea
				onClick={() => router.push({ pathname: "/watch", query: { v: id } })}
			>
				<CardMedia
					height="270"
					component="img"
					image={thumbnail}
					alt="video thumbnail"
				/>
				<CardContent>
					<Tooltip title={title}>
						<Typography noWrap gutterBottom variant="h6" component="div">
							{title}
						</Typography>
					</Tooltip>
					<Link passHref href={`/channel/${author.id}`}>
						<Box ref={ref} sx={{ display: "flex", alignItems: "center" }}>
							{isLoading && <CircularProgress sx={{ mr: 2 }} />}
							{data && (
								<Avatar
									sx={{ mr: 2 }}
									alt={author.name}
									src={
										data.authorThumbnails.find(
											(thumbnail) => thumbnail.width == 100
										)?.url as string
									}
								/>
							)}
							<Typography color="text.secondary" variant="subtitle1">
								{author.name}
							</Typography>
						</Box>
					</Link>
					<Typography sx={{ mt: 2 }} color="text.secondary" variant="body2">
						{abbreviateNumber(views)} Views • Published {published.text}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default Video;
