import { useRouter } from "next/router";

import { FC } from "react";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Video } from "@interfaces/video";

const Video: FC<Video> = ({ thumbnail, title, description, id }) => {
	const router = useRouter();

	return (
		<Card sx={{  display: "inline-block" }}>
			<CardActionArea onClick={() => router.push(`/video?id=${id}`)}>
				<CardMedia
					component="img"
					
					image={thumbnail}
					alt="video thumbnail"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default Video;
