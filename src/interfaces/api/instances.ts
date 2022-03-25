export interface ServerInstance {
	flag?: string;
	region?: string;
	stats?: Stats;
	cors?: boolean;
	api?: boolean;
	type: ServerInstanceType;
	uri: string;
	monitor?: Monitor;
}

interface Monitor {
	monitorId: number;
	createdAt: number;
	statusClass: StatusClass;
	name: string;
	url: null;
	type: MonitorType;
	dailyRatios: Ratio[];
	"90dRatio": Ratio;
	"30dRatio": Ratio;
}

interface Ratio {
	ratio: string;
	label: StatusClass;
}

export enum StatusClass {
	Black = "black",
	Success = "success",
	Warning = "warning"
}

export enum MonitorType {
	HTTPS = "HTTP(s)"
}

export interface Stats {
	version: string;
	software: Software;
	openRegistrations: boolean;
	usage: Usage;
	metadata: Metadata;
}

interface Metadata {
	updatedAt: number;
	lastChannelRefreshedAt: number;
}

interface Software {
	name: Name;
	version: string;
	branch: Branch;
}

export enum Branch {
	Master = "master"
}

export enum Name {
	Invidious = "invidious"
}

interface Usage {
	users: Users;
}

interface Users {
	total: number;
	activeHalfyear: number;
	activeMonth: number;
}

export enum ServerInstanceType {
	HTTPS = "https",
	Onion = "onion"
}
