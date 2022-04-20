import { FC, MutableRefObject } from "react";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import Fullscreen from "@mui/icons-material/Fullscreen";
import Pause from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Settings from "@mui/icons-material/Settings";
import SkipNext from "@mui/icons-material/SkipNext";
import Subtitles from "@mui/icons-material/Subtitles";
import VolumeUp from "@mui/icons-material/VolumeUp";

import { VideoStatus } from "@interfaces/videoPlayer";

import useVideoState from "@utils/hooks/useVideoState";

import Time from "@components/Player/Time";

const iconStyles = {
	mr: 1.5,
	cursor: "pointer"
};

const Actions: FC<{
	duration: number;
	videoRef: MutableRefObject<HTMLVideoElement | null>;
}> = ({ duration, videoRef }) => {
	const togglePlaying = useVideoState((state) => state.togglePlaying);
	const playing = useVideoState((state) => state.playing);

	const muted = useVideoState((state) => state.muted);
	const toggleMuted = useVideoState((state) => state.toggleMuted);

	return (
		<Box
			sx={{
				position: "absolute",
				display: "flex",
				width: "100%",
				height: 40,
				px: 1.5,
				bottom: 5,
				left: 0
			}}
		>
			<Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
				<Tooltip title={playing == VideoStatus.Playing ? "Pause" : "Play"}>
					<Box
						sx={{
							...iconStyles,
							display: "flex",
							alignItems: "center"
						}}
						onClick={() => togglePlaying()}
					>
						{playing == VideoStatus.Playing ? <Pause /> : <PlayArrow />}
					</Box>
				</Tooltip>
				<Tooltip title="Play next video">
					<SkipNext sx={iconStyles} />
				</Tooltip>
				<Tooltip title={muted ? "Unmute" : "Mute"}>
					<VolumeUp onClick={() => toggleMuted()} sx={iconStyles} />
				</Tooltip>
				<Time duration={duration} videoRef={videoRef} />
			</Box>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Tooltip title="Turn on captions">
					<Subtitles sx={iconStyles} />
				</Tooltip>
				<Tooltip title="Change quality">
					<Settings sx={iconStyles} />
				</Tooltip>
				<Tooltip title="Fullscreen">
					<Fullscreen
						sx={{
							...iconStyles,
							transition: "font-size .2s",
							"&:hover": { fontSize: "2rem" }
						}}
					/>
				</Tooltip>
			</Box>
		</Box>
	);
};

export default Actions;
