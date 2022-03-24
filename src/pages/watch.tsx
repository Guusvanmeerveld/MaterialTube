import NotFound from "./404";
import axios, { AxiosError } from "axios";

import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { useEffect } from "react";

import { useQuery } from "react-query";

import { Error } from "@interfaces/api";
import Video from "@interfaces/api/video";

import { videoToVideo } from "@utils/conversions";

import Layout from "@components/Layout";
import Loading from "@components/Loading";

const Watch: NextPage = () => {
	const router = useRouter();

	const videoId = router.query["v"];

	const { isLoading, error, data, refetch } = useQuery<
		Video,
		AxiosError<Error>
	>(
		["videoData", videoId],
		() =>
			axios
				.get(`https://invidious.privacy.gd/api/v1/videos/${videoId}`, {
					params: {}
				})
				.then((res) => res.data),
		{ enabled: false }
	);

	useEffect(() => {
		if (videoId) refetch();
	}, [videoId, refetch]);

	if (!videoId) {
		return <NotFound />;
	}

	return (
		<>
			<NextSeo
				title={data ? data.title : isLoading ? "Loading video..." : "Not Found"}
			/>

			<Layout>
				{isLoading && <Loading />}
				{}
			</Layout>
		</>
	);
};

export default Watch;
