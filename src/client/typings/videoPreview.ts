export interface VideoPreview {
	title: string;
	thumbnail: string;
	id: string;
	author: {
		name: string;
		id: string;
	};
	/*
		Duration in milliseconds.
	*/
	duration: number;
	views: number;
	uploaded: Date;
}
