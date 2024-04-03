"use client";

import { useDebounce } from "use-debounce";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	FiMaximize as MaximizeIcon,
	FiMinimize as MinimizeIcon,
	FiVolumeX as MutedIcon,
	FiPause as PauseIcon,
	FiFastForward as PlaybackRateIcon,
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

	const player = useRef<ReactPlayer>(null);

	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const [maximized, setMaximized] = useState(false);
	const [volume, setVolume] = useState(40);
	const [playbackRate, setPlaybackRate] = useState(1.0);
	const [playing, setPlaying] = useState(false);

	const [userSetProgress, setUserSetProgress] = useState(0);

	const [seek] = useDebounce(userSetProgress, 100);

	useEffect(() => {
		player.current?.seekTo(seek);
	}, [seek]);

	const volumeIcons = useMemo(
		() => [
			<VolumeIcon key="vol" />,
			<VolumeIcon1 key="vol1" />,
			<VolumeIcon2 key="vol2" />
		],
		[]
	);

	const playbackRateCategories = useMemo(
		() => [
			{ key: 0.25, label: "0.25" },
			{ key: 0.5, label: "0.5" },
			{ key: 1, label: "1.0" },
			{ key: 1.25, label: "1.25" },
			{ key: 1.5, label: "1.5" },
			{ key: 2, label: "2.0" }
		],
		[]
	);

	const handleBuffering = useCallback(() => {}, []);

	return (
		<>
			{stream && (
				<div className="relative" style={{ paddingTop: `${100 / (16 / 9)}%` }}>
					<div
						className="w-full absolute bottom-0 z-10 pb-2 px-4"
						style={{
							background:
								"linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)"
						}}
					>
						<div className="flex flex-col gap-1">
							<Slider
								aria-label="Video progress bar"
								step={0.1}
								onChange={(value) => {
									if (typeof value === "number") {
										setUserSetProgress(value / 100);
										setProgress(value / 100);
									}
								}}
								className="cursor-pointer"
								value={progress * 100}
							/>
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
											<Button
												variant="light"
												isIconOnly
												className="text-xl"
												onClick={() => setMaximized((state) => !state)}
											>
												{
													volumeIcons[
														Math.floor((volume / 100) * volumeIcons.length)
													]
												}
											</Button>
										</DropdownTrigger>
										<DropdownMenu aria-label="Volume menu">
											<DropdownItem>
												<Slider
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
											items={playbackRateCategories}
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

					<ReactPlayer
						playing={playing}
						volume={volume / 100}
						playbackRate={playbackRate}
						ref={player}
						className="absolute top-0 left-0"
						width="100%"
						height="100%"
						config={{ file: { forceHLS: true } }}
						onPause={() => setPlaying(false)}
						onPlay={() => setPlaying(true)}
						onDuration={(duration) => setDuration(duration)}
						onBuffer={handleBuffering}
						onProgress={({ played }) => {
							setProgress(played);
						}}
						// onPlaybackQualityChange={(e: unknown) =>
						// console.log("onPlaybackQualityChange", e)
						// }
						url={(stream as HlsStream).url}
					/>
				</div>
			)}
		</>
	);
};
