import Link from "next/link";

import { FC } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

import { abbreviateNumber } from "@src/utils/";

import VideoModel from "@interfaces/video";

import { useAuthorThumbnail } from "@utils/requests";

const Video: FC<{ video: VideoModel }> = ({ video }) => {
	const theme = useTheme();

	const {
		ref,
		isLoading,
		thumbnail: authorThumbnail
	} = useAuthorThumbnail(video.author.id, 176);

	return (
		<Paper sx={{ my: 2 }}>
			<Grid container spacing={0}>
				<Grid item md={4} sx={{ position: "relative" }}>
					{video.live && (
						<Box
							sx={{
								backgroundColor: red[600],
								position: "absolute",
								right: 5,
								top: 5,
								p: "3px",
								borderRadius: "2px",
								textTransform: "uppercase"
							}}
						>
							Live
						</Box>
					)}
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						style={{
							width: "100%",
							height: "100%",
							borderRadius: "4px"
						}}
						src={video.thumbnail}
						alt="thumbnail"
						loading="lazy"
					/>
				</Grid>

				<Grid item md={8} sx={{ padding: 3, width: "100%" }}>
					<Link
						href={{
							pathname: "/watch",
							query: { v: video.id }
						}}
					>
						<a>
							<Tooltip title={video.title}>
								<Typography gutterBottom noWrap variant="h5">
									{video.title}
								</Typography>
							</Tooltip>
						</a>
					</Link>
					<Typography
						gutterBottom
						variant="subtitle1"
						color={theme.palette.text.secondary}
					>
						{!(video.live || video.upcoming) && (
							<>
								{abbreviateNumber(video.views)} Views • Published{" "}
								{video.published.text}
							</>
						)}
						{video.live && <>🔴 Live now</>}
						{video.upcoming && video.premiereTimestamp && (
							<>
								Premiering on{" "}
								{new Date(video.premiereTimestamp * 1000).toLocaleDateString()}{" "}
								at{" "}
								{new Date(video.premiereTimestamp * 1000).toLocaleTimeString()}
							</>
						)}
					</Typography>
					<Typography
						gutterBottom
						variant="subtitle1"
						color={theme.palette.text.secondary}
					>
						{video.description.text}
					</Typography>
					<Link
						passHref
						href={{
							pathname: "/channel",
							query: {
								c: video.author.id
							}
						}}
					>
						<a>
							<Box
								ref={ref}
								sx={{
									display: "flex",
									alignItems: "center"
								}}
							>
								{isLoading && <CircularProgress />}
								{!isLoading && (
									<Avatar src={authorThumbnail} alt={video.author.name} />
								)}
								<Typography
									sx={{
										ml: 2
									}}
									variant="subtitle1"
									color={theme.palette.text.secondary}
								>
									{video.author.name}
								</Typography>
							</Box>
						</a>
					</Link>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Video;
