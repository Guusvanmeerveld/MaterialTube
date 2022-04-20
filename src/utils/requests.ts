import { useEffect } from "react";

import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";

import axios, { AxiosError } from "axios";

import useSettings from "@utils/hooks/useSettings";

interface Channel {
	authorThumbnails: { url: string; width: number; height: number }[];
}

export const useAuthorThumbnail = (
	authorId: string,
	quality: 32 | 48 | 76 | 100 | 176 | 512
): {
	isLoading: boolean;
	error: AxiosError<Error> | null;
	ref: (node?: Element) => void;
	thumbnail?: string;
} => {
	const [settings] = useSettings();

	const { ref, inView } = useInView({
		threshold: 0
	});

	const { isLoading, error, data, isFetched, refetch } = useQuery<
		Channel,
		AxiosError<Error>
	>(
		["channelData", authorId],
		() =>
			axios
				.get(
					`https://${settings.invidiousServer}/api/v1/channels/${authorId}`,
					{
						params: {
							fields: ["authorThumbnails"].join(",")
						}
					}
				)
				.then((res) => res.data),
		{ enabled: false }
	);

	useEffect(() => {
		if (!isFetched && inView) refetch();
	}, [refetch, isFetched, inView]);

	const thumbnail = data?.authorThumbnails.find(
		(thumbnail) => thumbnail.width == quality
	)?.url;

	return { isLoading, error, ref, thumbnail };
};
