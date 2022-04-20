import { FC, MutableRefObject } from "react";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { formatTime } from "@src/utils/";

import useVideoState from "@utils/hooks/useVideoState";

const Time: FC<{
	videoRef: MutableRefObject<HTMLVideoElement | null>;
	duration: number;
}> = ({ videoRef, duration }) => {
	const theme = useTheme();

	const progress = useVideoState((state) => state.progress);

	return (
		<Typography variant="subtitle1" color={theme.palette.text.secondary}>
			{formatTime(Math.round(progress))}
			<> / </>
			{formatTime(duration)}
		</Typography>
	);
};

export default Time;
