import Link from "next/link";

import { FC } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { abbreviateNumber, formatNumber } from "@src/utils/";

import { ChannelResult } from "@interfaces/api/search";

const Channel: FC<{ channel: ChannelResult }> = ({ channel }) => {
	const theme = useTheme();

	const thumbnail = channel.authorThumbnails.find(
		(thumbnail) => thumbnail.height == 512
	)?.url as string;

	return (
		<Link
			passHref
			href={{ pathname: "/channel", query: { c: channel.authorId } }}
		>
			<a>
				<Paper sx={{ my: 2 }}>
					<Box
						sx={{
							p: 3,
							display: { md: "flex", xs: "block" },
							alignItems: "center"
						}}
					>
						<Avatar
							sx={{
								width: 96,
								height: 96,
								mx: { md: 3, xs: "auto" },
								mb: { md: 0, xs: 2 }
							}}
							src={thumbnail}
							alt={channel.author}
						/>

						<Box sx={{ textAlign: { md: "left", xs: "center" } }}>
							<Typography variant="h5">{channel.author}</Typography>
							<Typography
								variant="subtitle1"
								color={theme.palette.text.secondary}
							>
								{abbreviateNumber(channel.subCount)} subscribers •{" "}
								{formatNumber(channel.videoCount)} videos
							</Typography>

							<Typography
								variant="subtitle1"
								color={theme.palette.text.secondary}
							>
								{channel.description}
							</Typography>
						</Box>
					</Box>
				</Paper>
			</a>
		</Link>
	);
};

export default Channel;
