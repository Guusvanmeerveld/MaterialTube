export interface Video {
	title: string;
	id: string;
	author: {
		name: string;
		id: string;
		avatar?: string;
	};
	thumbnail: string;
	description: string;
	/*
		Duration in milliseconds.
	*/
	duration: number;
	views: number;
	uploaded: Date;
	live: boolean;
}
