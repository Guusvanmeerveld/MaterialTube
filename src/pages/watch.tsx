import NotFound from "./404";

import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { useQuery } from "react-query";

import axios, { AxiosError } from "axios";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Error } from "@interfaces/api";
import VideoAPI from "@interfaces/api/video";

import { videoToVideo } from "@utils/conversions";
import useSettings from "@utils/hooks/useSettings";

import Layout from "@components/Layout";
import Loading from "@components/Loading";
import Player from "@components/Player";

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

			<Layout>
				{data && (
					<>
						<Player
							streams={data.formatStreams}
							formats={data.adaptiveFormats}
							captions={data.captions}
							length={data.lengthSeconds}
							videoId={data.videoId}
							sx={{ height: "75vh", margin: "auto", mt: 2 }}
						/>
						<Container sx={{ pt: 2 }}>
							<Typography variant="h4">{data.title}</Typography>
						</Container>
					</>
				)}
			</Layout>
		</>
	);
};

export default Watch;
