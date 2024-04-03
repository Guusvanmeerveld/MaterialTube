export enum StreamType {
	Dash,
	Hls,
	Standard
}

export interface BaseStream {
	type: StreamType;
}

export interface DashStream extends BaseStream {
	type: StreamType.Dash;
	url: string;
}

export interface HlsStream extends BaseStream {
	type: StreamType.Hls;
	url: string;
}

export interface StandardStream extends BaseStream {
	type: StreamType.Standard;
	video: VideoStream[];
	audio: AudioStream[];
}

export interface VideoStream {}

export interface AudioStream {}

export type Stream = DashStream | HlsStream | StandardStream;
