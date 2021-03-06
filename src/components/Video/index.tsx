import { DateTime } from "luxon";

import Link from "next/link";

import { FC } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { abbreviateNumber, formatTime } from "@src/utils";

import VideoModel from "@interfaces/video";

import { useAuthorThumbnail } from "@utils/requests";

const Video: FC<VideoModel> = (video) => {
	const theme = useTheme();

	const {
		ref,
		isLoading,
		thumbnail: authorThumbnail
	} = useAuthorThumbnail(video.author.id, 100);

	return (
		<Card sx={{ width: "100%" }}>
			<Link href={{ pathname: "/watch", query: { v: video.id } }}>
				<a>
					<CardActionArea>
						<Box sx={{ position: "relative" }}>
							<CardMedia
								height="270"
								component="img"
								image={video.thumbnail}
								alt="video thumbnail"
							/>
							<Box
								sx={{
									p: 0.5,
									borderRadius: "3px",
									backgroundColor: "#000",
									position: "absolute",
									bottom: 10,
									right: 10
								}}
							>
								{formatTime(video.length)}
							</Box>
						</Box>
						<CardContent>
							<Tooltip title={video.title}>
								<Typography noWrap gutterBottom variant="h6" component="div">
									{video.title}
								</Typography>
							</Tooltip>
							<Link passHref href={`/channel/${video.author.id}`}>
								<a>
									<Box ref={ref} sx={{ display: "flex", alignItems: "center" }}>
										{isLoading && <CircularProgress sx={{ mr: 2 }} />}
										{!isLoading && (
											<Avatar
												sx={{ mr: 2 }}
												alt={video.author.name}
												src={authorThumbnail}
											/>
										)}
										<Typography
											color={theme.palette.text.secondary}
											variant="subtitle1"
										>
											{video.author.name}
										</Typography>
									</Box>
								</a>
							</Link>
							<Typography
								sx={{ mt: 2 }}
								color={theme.palette.text.secondary}
								variant="body2"
							>
								{!(video.live || video.upcoming) && (
									<>
										{abbreviateNumber(video.views)} Views ??? Published{" "}
										{video.published.text}
									</>
								)}
							</Typography>
						</CardContent>
					</CardActionArea>
				</a>
			</Link>
		</Card>
	);
};

export default Video;
