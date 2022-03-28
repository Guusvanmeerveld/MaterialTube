export interface Error {
	error: string;
}

export interface Thumbnail {
	url: string;
	width: number;
	height: number;
	quality?: Quality;
}

export enum Quality {
	Default = "default",
	End = "end",
	High = "high",
	Maxres = "maxres",
	Maxresdefault = "maxresdefault",
	Medium = "medium",
	Middle = "middle",
	Sddefault = "sddefault",
	Start = "start"
}
