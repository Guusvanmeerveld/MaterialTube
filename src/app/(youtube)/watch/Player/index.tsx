"use client";

import screenfull from "screenfull";
import { useDebounce } from "use-debounce";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
	FiMaximize as MaximizeIcon,
	FiMinimize as MinimizeIcon,
	FiVolumeX as MutedIcon,
	FiPause as PauseIcon,
	FiPlay as PlayIcon,
	FiSettings as SettingsIcon,
	FiVolume as VolumeIcon,
	FiVolume1 as VolumeIcon1,
	FiVolume2 as VolumeIcon2
} from "react-icons/fi";
import ReactPlayer from "react-player";

import { Button } from "@heroui/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@heroui/dropdown";
import { Slider } from "@heroui/slider";

import { HlsStream, Stream, StreamType } from "@/client/typings/stream";
import { Video } from "@/client/typings/video";
import formatDuration from "@/utils/formatDuration";

import { Component } from "@/typings/component";

export const Player: Component<{
	streams: Stream[];
	video: Video;
	initialTimestamp?: number;
}> = ({ streams, initialTimestamp, video }) => {
	const stream = streams.find((stream) => stream.type === StreamType.Hls);

	const playerRef = useRef<ReactPlayer>(null);

	const videoPlayerId = "video-player";

	// TODO: Make framerate based on video, not a set number
	const framerate = 60;

	const volumeIcons = useMemo(
		() => [
			<VolumeIcon key="vol" />,
			<VolumeIcon1 key="vol1" />,
			<VolumeIcon2 key="vol2" />
		],
		[]
	);

	const [playbackRateMenuItems, playbackRateCategories] = useMemo(() => {
		const categories = [0.25, 0.5, 1, 1.25, 1.5, 2];

		return [
			categories.map((speed) => ({
				key: speed,
				label: speed.toString()
			})),
			categories
		];
	}, []);

	const [showOverlay, setShowOverlay] = useState(false);
	const [mouseOnOverlay, setMouseOnOverlay] = useState([0, 0]);

	useEffect(() => {
		setShowOverlay(true);
	}, [mouseOnOverlay]);

	const [mouseLastMoved] = useDebounce(mouseOnOverlay, 2000);

	useEffect(() => {
		setShowOverlay(false);
	}, [mouseLastMoved]);

	const [duration, setDuration] = useState(video.duration / 1000);
	const [progress, setProgress] = useState(0);
	const [loaded, setLoaded] = useState(0);
	const [maximized, setMaximized] = useState(false);
	const [volume, setVolume] = useState(40);
	const [muted, setMuted] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1.0);
	const [playing, setPlaying] = useState(false);

	const [userSetProgress, setUserSetProgress] = useState(0);

	const seekForward = useCallback(
		(seconds: number) => {
			if (duration >= seconds) {
				let newProgress = progress + seconds / duration;

				if (newProgress <= 0) newProgress = 0;

				if (newProgress >= duration) newProgress = duration;

				setUserSetProgress(newProgress);
				setProgress(newProgress);
			}
		},
		[progress, duration]
	);

	const increaseVolume = useCallback((amount: number) => {
		setVolume((state) => {
			const newVolume = state + amount;

			if (newVolume >= 0 && newVolume <= 100) return newVolume;
			else return state;
		});
	}, []);

	const increasePlaybackRate = useCallback(
		(amount: number) => {
			const indexOfCurrentRate = playbackRateCategories.indexOf(playbackRate);

			if (indexOfCurrentRate < 0) return;

			const newRateIndex = indexOfCurrentRate + amount;

			if (newRateIndex < 0 || newRateIndex > playbackRateCategories.length - 1)
				return;

			setPlaybackRate(playbackRateCategories[newRateIndex]);
		},
		[playbackRate, playbackRateCategories]
	);

	useHotkeys(["k", "space"], () => setPlaying((state) => !state), {
		preventDefault: true
	});

	useHotkeys(["f"], () => setMaximized((state) => !state));

	useHotkeys(["m"], () => setMuted((state) => !state));

	useHotkeys(["arrowup"], () => increaseVolume(5), { preventDefault: true });
	useHotkeys(["arrowdown"], () => increaseVolume(-5), { preventDefault: true });

	useHotkeys(["arrowright"], () => seekForward(5));
	useHotkeys(["arrowleft"], () => seekForward(-5));

	useHotkeys(["shift+."], () => increasePlaybackRate(1));
	useHotkeys(["shift+,"], () => increasePlaybackRate(-1));

	useHotkeys(["l"], () => seekForward(10));
	useHotkeys(["j"], () => seekForward(-10));

	useHotkeys(
		["."],
		() => {
			if (!playing) seekForward(1 / framerate);
		},
		[seekForward, playing, framerate]
	);
	useHotkeys(
		[","],
		() => {
			if (!playing) seekForward(-(1 / framerate));
		},
		[seekForward, playing, framerate]
	);

	// Mute if volume is 0
	useEffect(() => {
		if (volume === 0) setMuted(true);
		else setMuted(false);
	}, [volume]);

	useEffect(() => {
		playerRef.current?.seekTo(userSetProgress);
	}, [userSetProgress]);

	useEffect(() => {
		if (initialTimestamp && initialTimestamp <= duration)
			setUserSetProgress(initialTimestamp / duration);
	}, [initialTimestamp, duration]);

	const updateMaximized = useCallback(() => {
		setMaximized(screenfull.isFullscreen);
	}, [setMaximized]);

	useEffect(() => {
		if (screenfull.isEnabled) {
			screenfull.on("change", updateMaximized);
		}

		return (): void => screenfull.off("change", updateMaximized);
	}, [updateMaximized]);

	useEffect(() => {
		if (screenfull.isEnabled) {
			const playerElement = document.getElementById(videoPlayerId) ?? undefined;

			if (maximized) screenfull.request(playerElement);
			else screenfull.exit();
		}
	}, [maximized]);

	return (
		<div className="relative" style={{ paddingTop: `${100 / (16 / 9)}%` }}>
			<div id={videoPlayerId}>
				<div
					className="flex flex-col w-full h-full absolute bottom-0 z-10 transition-opacity ease-in duration-[2000ms]"
					onMouseMove={(e) => setMouseOnOverlay([e.movementX, e.movementY])}
					style={{
						opacity: showOverlay ? 100 : 0,
						cursor: showOverlay ? "initial" : "none"
					}}
				>
					<div
						className="flex-row gap-2 p-4"
						style={{
							display: maximized ? "flex" : "none",
							background:
								"linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)"
						}}
					>
						<p className="text-3xl">{video.title}</p>
					</div>
					<div
						className="flex-1"
						onClick={() => setPlaying((state) => !state)}
					/>
					<div
						className="flex flex-col gap-1 pb-2 px-4"
						style={{
							background:
								"linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)"
						}}
					>
						<div
							className="relative flex items-center"
							style={{ height: "24px" }}
						>
							<Slider
								aria-label="Video progress bar"
								className="w-full cursor-pointer absolute bottom-0 z-20"
								onChange={(value) => {
									if (typeof value === "number") {
										setProgress(value / 100);
									}
								}}
								onChangeEnd={(value) => {
									if (typeof value === "number") {
										setUserSetProgress(value / 100);
									}
								}}
								step={0.1}
								value={progress * 100}
							/>
							<div
								className="h-3 bg-default-600/50 z-10 rounded-lg"
								style={{ width: `${loaded * 100}%` }}
							/>
						</div>

						<div className="flex flex-row items-center gap-4">
							<div className="flex flex-1 flex-row gap-2 items-center">
								<Button
									className="text-xl"
									isIconOnly
									onClick={() => setPlaying((state) => !state)}
									variant="light"
								>
									{playing ? <PauseIcon /> : <PlayIcon />}
								</Button>

								<Dropdown>
									<DropdownTrigger>
										<Button className="text-xl" isIconOnly variant="light">
											{muted ? (
												<MutedIcon />
											) : (
												volumeIcons[
													Math.floor((volume / 100) * volumeIcons.length)
												]
											)}
										</Button>
									</DropdownTrigger>
									<DropdownMenu aria-label="Volume menu">
										<DropdownItem key="volume-menu">
											<Slider
												aria-label="Volume slider"
												className="h-48"
												onChange={(value) => {
													if (typeof value === "number") setVolume(value);
												}}
												orientation="vertical"
												value={volume}
											/>
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>

								<p>
									{formatDuration(progress * duration * 1000)} /{" "}
									{formatDuration(duration * 1000)}
								</p>
							</div>
							<div className="flex flex-row gap-2 items-center">
								<Dropdown>
									<DropdownTrigger>
										<Button className="text-xl" isIconOnly variant="light">
											<SettingsIcon />
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label="Playback rate menu"
										items={playbackRateMenuItems}
										onAction={(key) => {
											setPlaybackRate(parseFloat(key as string));
										}}
									>
										{(item) => (
											<DropdownItem key={item.key}>{item.label}x</DropdownItem>
										)}
									</DropdownMenu>
								</Dropdown>

								<Dropdown>
									<DropdownTrigger>
										<Button className="text-xl" variant="light">
											{playbackRate}x
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label="Playback rate menu"
										items={playbackRateMenuItems}
										onAction={(key) => {
											setPlaybackRate(parseFloat(key as string));
										}}
									>
										{(item) => (
											<DropdownItem key={item.key}>{item.label}x</DropdownItem>
										)}
									</DropdownMenu>
								</Dropdown>

								<Button
									className="text-xl"
									isIconOnly
									onClick={() => setMaximized((state) => !state)}
									variant="light"
								>
									{maximized ? <MinimizeIcon /> : <MaximizeIcon />}
								</Button>
							</div>
						</div>
					</div>
				</div>

				{stream && (
					<ReactPlayer
						className="absolute top-0 left-0"
						height="100%"
						muted={muted}
						onDuration={(duration) => setDuration(duration)}
						onPause={() => setPlaying(false)}
						onPlay={() => setPlaying(true)}
						onProgress={({ played, loaded }) => {
							setProgress(played);
							setLoaded(loaded);
						}}
						playbackRate={playbackRate}
						playing={playing}
						ref={playerRef}
						url={(stream as HlsStream).url}
						volume={volume / 100}
						width="100%"
						// onPlaybackQualityChange={(e: unknown) =>
						// console.log("onPlaybackQualityChange", e)
						// }
						// onBuffer={({}) => {}}
					/>
				)}
			</div>
		</div>
	);
};
