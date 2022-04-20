import create from "zustand";

import { PausedBy, VideoSpeed, VideoStatus } from "@interfaces/videoPlayer";

interface VideoState {
	progress: number;
	setProgress: (progress: number) => void;
	speed: VideoSpeed;
	setSpeed: (speed: VideoSpeed) => void;
	error?: string;
	setError: (error: string) => void;
	waiting: boolean;
	setWaiting: (waiting: boolean) => void;
	muted: boolean;
	toggleMuted: () => void;
	pausedBy?: PausedBy;
	playing: VideoStatus;
	togglePlaying: (pausedBy?: PausedBy) => void;
	setPlaying: (playing: VideoStatus, pausedBy?: PausedBy) => void;
}

const useVideoState = create<VideoState>((set) => ({
	progress: 0,
	setProgress: (progress) => set(() => ({ progress })),
	speed: 1,
	setSpeed: (speed) => set(() => ({ speed })),
	error: undefined,
	setError: (error) => set(() => ({ error })),
	waiting: true,
	setWaiting: (waiting) => set(() => ({ waiting })),
	muted: false,
	toggleMuted: () => set((state) => ({ muted: !state.muted })),
	pausedBy: undefined,
	playing: VideoStatus.Paused,
	togglePlaying: (pausedBy?: PausedBy) =>
		set((state) => ({
			playing:
				state.playing == VideoStatus.Playing
					? VideoStatus.Paused
					: VideoStatus.Playing,
			pausedBy: state.playing == VideoStatus.Playing ? pausedBy : undefined
		})),
	setPlaying: (playing, pausedBy) =>
		set(() => ({
			playing,
			pausedBy: playing == VideoStatus.Paused ? pausedBy : undefined
		}))
}));

export default useVideoState;
