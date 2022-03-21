import { FC } from "react";

import { Grid } from "@mui/material";

import { Video as VideoModel } from "@interfaces/video";

import Video from "@components/Video";

const VideoGrid: FC<{ videos: VideoModel[] }> = ({ videos }) => {
	return (
		<Grid
			container
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
		>
			{videos.map((video) => (
				<Grid item key={video.id} xs={3}>
					<Video {...video} />
				</Grid>
			))}
		</Grid>
	);
};

export default VideoGrid;
