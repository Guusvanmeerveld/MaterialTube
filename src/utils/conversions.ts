import { Quality } from "@interfaces/api";
import { VideoResult } from "@interfaces/api/search";
import VideoTrending from "@interfaces/api/trending";
import VideoAPI from "@interfaces/api/video";
import Video from "@interfaces/video";

export const apiToVideo = (item: VideoTrending | VideoResult): Video => {
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
			time: new Date(item.published),
			text: item.publishedText
		},
		views: item.viewCount,
		live: item.liveNow,
		premium: item.premium,
		thumbnail: item.videoThumbnails.find(
			(thumbnail) => thumbnail.quality == Quality.Maxresdefault
		)?.url as string
	};
};

export const videoToVideo = (item: VideoAPI): Video => {
	return {
		title: item.title,
		views: item.viewCount,
		likes: item.likeCount,
		dislikes: item.dislikeCount,
		id: item.videoId,
		description: { html: item.descriptionHtml, text: item.description },
		length: item.lengthSeconds,
		live: item.liveNow,
		premiered: item.premiereTimestamp
			? new Date(item.premiereTimestamp)
			: undefined,
		premium: item.premium,
		published: {
			time: new Date(item.published),
			text: item.publishedText
		},
		rating: item.rating,
		genre: {
			type: item.genre,
			url: item.genreUrl
		},
		keywords: item.keywords,
		familyFriendly: item.isFamilyFriendly,
		subscriptions: item.subCountText,
		thumbnail: item.videoThumbnails.find(
			(thumbnail) => thumbnail.quality == "maxresdefault"
		)?.url as string,
		author: {
			id: item.authorId,
			name: item.author,
			url: item.authorUrl,
			thumbnail: item.authorThumbnails.find(
				(thumbnail) => thumbnail.width == 100
			)?.url as string
		},
		adaptiveFormats: item.adaptiveFormats,
		recommendedVideos: item.recommendedVideos,
		formatStreams: item.formatStreams,
		captions: item.captions
	};
};
