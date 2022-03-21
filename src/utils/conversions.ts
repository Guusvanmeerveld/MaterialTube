import { Trending, Video } from "@interfaces/video";

export const trendingToVideo = (item: Trending): Video => {
	return {
		title: item.title,
		description: {
			text: item.description,
			html: item.descriptionHtml
		},
		id: item.videoId,
		author: {
			name: item.author,
			id: item.authorId,
			url: item.authorUrl
		},
		length: item.lengthSeconds,
		published: {
			time: item.published,
			text: item.publishedText
		},
		views: item.viewCount,
		thumbnail: item.videoThumbnails.find(
			(thumbnail) => thumbnail.quality == "maxresdefault"
		)?.url as string
	};
};
