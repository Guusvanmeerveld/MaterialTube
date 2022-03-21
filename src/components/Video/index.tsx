import Link from "next/link";
import { useRouter } from "next/router";

import { FC } from "react";

import { useQuery } from "react-query";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { abbreviateNumber } from "@src/utils";

import { Channel, Quality } from "@interfaces/channel";
import { Video as VideoModel } from "@interfaces/video";

const Video: FC<VideoModel> = ({
	thumbnail,
	title,
	id,
	author,
	views,
	published
}) => {
	const router = useRouter();

	return (
		<Card sx={{ display: "inline-block" }}>
			<CardActionArea onClick={() => router.push(`/watch?v=${id}`)}>
				<CardMedia
					height="270"
					component="img"
					image={thumbnail}
					alt="video thumbnail"
				/>
				<CardContent>
					<Tooltip title={title}>
						<Typography gutterBottom variant="h6" component="div">
							{title}
						</Typography>
					</Tooltip>
					<Link passHref href={`/channel/${author.id}`}>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Avatar sx={{ mr: 2 }} alt={author.name} />
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
