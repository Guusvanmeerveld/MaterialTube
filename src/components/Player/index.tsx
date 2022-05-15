import { FC, MutableRefObject, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

import { AdaptiveFormat, Caption, FormatStream } from "@interfaces/video";
import { PausedBy, VideoStatus } from "@interfaces/videoPlayer";

import useSettings from "@utils/hooks/useSettings";
import useVideoState from "@utils/hooks/useVideoState";

import Actions from "@components/Player/Actions";
import ProgressBar from "@components/Player/ProgressBar";

const Player: FC<{
	formats: AdaptiveFormat[];
	streams: FormatStream[];
	captions: Caption[];
	length: number;
	videoId: string;
	sx?: SxProps;
}> = ({ formats, length: duration, sx }) => {
	const [settings] = useSettings();

	const playing = useVideoState((state) => state.playing);
	const togglePlaying = useVideoState((state) => state.togglePlaying);
	const setPlaying = useVideoState((state) => state.setPlaying);

	const speed = useVideoState((state) => state.speed);
	const muted = useVideoState((state) => state.muted);

	const error = useVideoState((state) => state.error);
	const setError = useVideoState((state) => state.setError);

	const waiting = useVideoState((state) => state.waiting);
	const setWaiting = useVideoState((state) => state.setWaiting);

	const setProgress = useVideoState((state) => state.setProgress);

	const pausedBy = useVideoState((state) => state.pausedBy);

	const videoStream = formats.find(
		(format) =>
			format.qualityLabel == "2160p" ||
			format.qualityLabel == "1080p"
	)?.url;

	const audioStream = formats.find((format) =>
		format.type.includes("audio/mp4")
	)?.url as string;

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const audioRef = useRef<HTMLAudioElement>(new Audio(audioStream));

	useEffect(() => {
		const audio = audioRef.current;

		audio.volume = 0.25;

		const video = videoRef.current;

		if (!video) return;

		video.playbackRate = speed;

		video.currentTime = 0;

		const handleError = (e: ErrorEvent) => {
			setError(e.message || "An unknown error occurred");
			setPlaying(VideoStatus.Paused, PausedBy.Player);
		};

		const handleWaiting = (e: Event) => {
			setWaiting(true);

			if (playing == VideoStatus.Playing)
				setPlaying(VideoStatus.Paused, PausedBy.Player);
		};

		const handleFinishedWaiting = (e: Event) => {
			setWaiting(false);

			if (pausedBy == PausedBy.Player)
				setPlaying(VideoStatus.Playing);
		};

		const onTimeUpdate = () => {
			setProgress(video.currentTime ?? 0);
		};

		const handlePause = () => {
			setPlaying(VideoStatus.Paused);
		};

		if (!videoStream) setError("Could not find video stream");

		video.addEventListener("waiting", handleWaiting);
		video.addEventListener("canplaythrough", handleFinishedWaiting);
		video.addEventListener("error", handleError);
		video.addEventListener("pause", handlePause);
		video.addEventListener("timeupdate", onTimeUpdate);

		audio.addEventListener("waiting", handleWaiting);
		audio.addEventListener("canplaythrough", handleFinishedWaiting);
		audio.addEventListener("pause", handlePause);

		return () => {
			audio.srcObject = null;

			video.removeEventListener("waiting", handleWaiting);
			video.removeEventListener(
				"canplaythrough",
				handleFinishedWaiting
			);
			video.removeEventListener("error", handleError);
			video.removeEventListener("pause", handlePause);
			video.removeEventListener("timeupdate", onTimeUpdate);

			audio.removeEventListener("waiting", handleWaiting);
			audio.removeEventListener(
				"canplaythrough",
				handleFinishedWaiting
			);
			audio.removeEventListener("pause", handlePause);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setPlaying(
			settings.autoPlay
				? VideoStatus.Playing
				: VideoStatus.Paused
		);
	}, [setPlaying, settings.autoPlay]);

	useEffect(() => {
		if (!videoRef.current || !audioRef.current) return;

		if (playing == VideoStatus.Playing && !error && !waiting) {
			videoRef.current.play();
			audioRef.current.play();
		} else {
			videoRef.current.pause();
			audioRef.current.pause();
		}
	}, [error, playing, waiting]);

	useEffect(() => {
		if (!videoRef.current) return;

		videoRef.current.playbackRate = speed;
	}, [speed]);

	useEffect(() => {
		if (!audioRef.current) return;

		audioRef.current.muted = muted;
	}, [muted, audioRef]);

	return (
		<Box
			sx={{
				...sx,
				maxWidth: "fit-content",
				position: "relative"
			}}
		>
			{error && (
				<Box
					sx={{
						position: "absolute",
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					{error}
				</Box>
			)}
			<video
				src={videoStream}
				ref={videoRef}
				style={{
					height: "100%",
					width: "100%"
				}}
				autoPlay={playing == VideoStatus.Playing}
			>
				Your browser does not support video playback.
			</video>
			<Box
				onClick={() => togglePlaying(PausedBy.User)}
				sx={{
					boxShadow: "0px -15px 30px 0px rgba(0,0,0,0.75) inset",
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%"
				}}
			></Box>
			<ProgressBar videoRef={videoRef} duration={duration} />
			<Actions videoRef={videoRef} duration={duration} />
		</Box>
	);
};

export default Player;
