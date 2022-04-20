import { FC, MutableRefObject, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import useVideoState from "@utils/hooks/useVideoState";

const ProgressBar: FC<{
	duration: number;
	videoRef: MutableRefObject<HTMLVideoElement | null>;
}> = ({ videoRef, duration }) => {
	const theme = useTheme();

	const [buffer, setBuffer] = useState<number>(1);

	const height = 5;

	const bufferColor = "rgba(200, 200, 200, 0.5)";
	const backgroundColor = "rgba(132, 132, 132, 0.5)";

	const progress = (useVideoState((state) => state.progress) / duration) * 100;

	useEffect(() => {
		if (!videoRef.current) return;

		const buffered = videoRef.current.buffered;

		if (buffered.length != 0) {
			const newBuffer =
				((buffered.end(0) - buffered.start(0)) / duration) * 100;

			if (newBuffer != buffer) {
				setBuffer(newBuffer);
			}
		}
	}, [buffer, duration, videoRef, videoRef.current?.buffered]);

	return (
		<Box
			sx={{
				position: "absolute",
				cursor: "pointer",
				width: "98%",
				backgroundColor,
				height,
				left: "1%",
				bottom: 45,
				"&:hover": {}
			}}
		>
			<Box sx={{ position: "relative" }}>
				<Box
					sx={{
						backgroundColor: theme.palette.primary.main,
						position: "absolute",
						height,
						zIndex: 10
					}}
					style={{ width: `${progress}%` }}
				></Box>
				<Box
					sx={{
						backgroundColor: bufferColor,
						position: "absolute",
						height
					}}
					style={{ width: `${buffer}%` }}
				></Box>
			</Box>
		</Box>
	);
};

export default ProgressBar;
