import NotFound from "./404";

import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { useEffect } from "react";

import { useQuery } from "react-query";

import axios, { AxiosError } from "axios";

import { Error } from "@interfaces/api";
import VideoAPI from "@interfaces/api/video";

import { videoToVideo } from "@utils/conversions";
import { useSettings } from "@utils/hooks";

import Layout from "@components/Layout";
import Loading from "@components/Loading";

const Watch: NextPage = () => {
	const { query, isReady } = useRouter();

	const videoId = query["v"];

	const [settings] = useSettings();

	const { isLoading, error, data } = useQuery<
		VideoAPI | null,
		AxiosError<Error>
	>(["videoData", videoId], () =>
		videoId
			? axios
					.get(`https://${settings.invidiousServer}/api/v1/videos/${videoId}`, {
						params: {}
					})
					.then((res) => res.data)
			: null
	);

	if (!isReady || isLoading) {
		return (
			<>
				<NextSeo title="Loading video..." />
				<Layout>
					<Loading />
				</Layout>
			</>
		);
	}

	if (!videoId) {
		return <NotFound />;
	}

	return (
		<>
			<NextSeo title={data ? data.title : "Not Found"} />

			<Layout>{}</Layout>
		</>
	);
};

export default Watch;
