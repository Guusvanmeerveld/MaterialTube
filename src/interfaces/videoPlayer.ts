export type VideoSpeed = 0.25 | 0.5 | 1.0 | 1.25 | 1.5 | 1.75 | 2.0;

export enum VideoStatus {
	Playing = "playing",
	Paused = "paused"
}

export enum PausedBy {
	User = "user",
	Player = "player"
}
