"use client";

import screenfull from "screenfull";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
	FiMaximize as MaximizeIcon,
	FiMinimize as MinimizeIcon,
	FiVolumeX as MutedIcon,
	FiPause as PauseIcon,
	FiPlay as PlayIcon,
	FiVolume as VolumeIcon,
	FiVolume1 as VolumeIcon1,
	FiVolume2 as VolumeIcon2
} from "react-icons/fi";
import ReactPlayer from "react-player";

import { Button } from "@nextui-org/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@nextui-org/dropdown";
import { Slider } from "@nextui-org/slider";

import { HlsStream, Stream, StreamType } from "@/client/typings/stream";
import formatDuration from "@/utils/formatDuration";

import { Component } from "@/typings/component";

export const Player: Component<{ streams: Stream[] }> = ({ streams }) => {
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

	const [progress, setProgress] = useState(0);
	const [loaded, setLoaded] = useState(0);
	const [duration, setDuration] = useState(0);
	const [maximized, setMaximized] = useState(false);
	const [volume, setVolume] = useState(40);
	const [muted, setMuted] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1.0);
	const [playing, setPlaying] = useState(false);

	const [userSetProgress, setUserSetProgress] = useState(0);

	const seekForward = useCallback(
		(seconds: number) => {
			if (duration >= seconds) {
				const newProgress = progress + seconds / duration;

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

	const updateMaximized = useCallback(() => {
		setMaximized(screenfull.isFullscreen);
	}, [setMaximized]);

	useEffect(() => {
		if (screenfull.isEnabled) {
			screenfull.on("change", updateMaximized);
		}

		return () => screenfull.off("change", updateMaximized);
	}, [updateMaximized]);

	useEffect(() => {
		if (screenfull.isEnabled) {
			const playerElement = document.getElementById(videoPlayerId) ?? undefined;

			if (maximized) screenfull.request(playerElement);
			else screenfull.exit();
		}
	}, [maximized]);

	return (
		<>
			<div className="relative" style={{ paddingTop: `${100 / (16 / 9)}%` }}>
				<div id={videoPlayerId}>
					<div className="flex flex-col w-full h-full absolute bottom-0 z-10 transition-opacity ease-in duration-[2000ms] opacity-0 hover:opacity-100">
						<div
							className="flex-1"
							onClick={() => setPlaying((state) => !state)}
						></div>
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
									step={0.1}
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
										variant="light"
										isIconOnly
										className="text-xl"
										onClick={() => setPlaying((state) => !state)}
									>
										{playing ? <PauseIcon /> : <PlayIcon />}
									</Button>

									<Dropdown>
										<DropdownTrigger>
											<Button variant="light" isIconOnly className="text-xl">
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
											<DropdownItem>
												<Slider
													aria-label="Volume slider"
													className="h-48"
													value={volume}
													onChange={(value) => {
														if (typeof value === "number") setVolume(value);
													}}
													orientation="vertical"
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
											<Button
												className="text-xl"
												// startContent={<PlaybackRateIcon />}
												variant="light"
											>
												{playbackRate}x
											</Button>
										</DropdownTrigger>
										<DropdownMenu
											aria-label="Playback rate menu"
											onAction={(key) => {
												setPlaybackRate(parseFloat(key as string));
											}}
											items={playbackRateMenuItems}
										>
											{(item) => (
												<DropdownItem key={item.key}>
													{item.label}x
												</DropdownItem>
											)}
										</DropdownMenu>
									</Dropdown>

									<Button
										variant="light"
										isIconOnly
										className="text-xl"
										onClick={() => setMaximized((state) => !state)}
									>
										{maximized ? <MinimizeIcon /> : <MaximizeIcon />}
									</Button>
								</div>
							</div>
						</div>
					</div>

					{stream && (
						<ReactPlayer
							playing={playing}
							volume={volume / 100}
							muted={muted}
							playbackRate={playbackRate}
							ref={playerRef}
							className="absolute top-0 left-0"
							width="100%"
							height="100%"
							onPause={() => setPlaying(false)}
							onPlay={() => setPlaying(true)}
							onDuration={(duration) => setDuration(duration)}
							// onBuffer={({}) => {}}
							onProgress={({ played, loaded }) => {
								setProgress(played);
								setLoaded(loaded);
							}}
							// onPlaybackQualityChange={(e: unknown) =>
							// console.log("onPlaybackQualityChange", e)
							// }
							url={(stream as HlsStream).url}
						/>
					)}
				</div>
			</div>
		</>
	);
};
