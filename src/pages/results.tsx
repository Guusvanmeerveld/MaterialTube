import NotFound from "./404";

import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { useQuery } from "react-query";

import axios from "axios";

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Result, {
	CategoryResult,
	ChannelResult,
	PlaylistResult,
	VideoResult
} from "@interfaces/api/search";

import { apiToVideo } from "@utils/conversions";
import { useSettings } from "@utils/hooks";

import Channel from "@components/Channel/Inline";
import Layout from "@components/Layout";
import Loading from "@components/Loading";
import Video from "@components/Video/Inline";

const Results: NextPage = () => {
	const router = useRouter();

	const [settings] = useSettings();

	const query = router.query["search_query"];

	const { data, isLoading } = useQuery<Result[] | undefined>(
		["searchResultsFor", query],
		() =>
			query
				? axios
						.get(`https://${settings.invidiousServer}/api/v1/search`, {
							params: {
								q: query,
								type: "all"
							}
						})
						.then((res) => res.data)
				: undefined
	);

	if (!router.isReady || isLoading)
		return (
			<>
				<NextSeo title="Searching..." />
				<Layout>
					<Loading />
				</Layout>
			</>
		);

	if (!query) return <NotFound />;

	const channels = data?.filter((result) => result.type == "channel") as
		| ChannelResult[]
		| undefined;

	const videos = data?.filter((result) => result.type == "video") as
		| VideoResult[]
		| undefined;

	// const categories = data?.filter()

	return (
		<>
			<NextSeo title={query as string} />
			<Layout>
				<Container sx={{ py: 2 }}>
					{channels && channels.length != 0 && (
						<>
							<Typography variant="h5">Channels</Typography>
							{channels.map((channel, i) => (
								<Channel key={i} channel={channel} />
							))}
							<Divider sx={{ my: 4 }} />
						</>
					)}
					{videos && videos.length != 0 && (
						<>
							<Typography variant="h5">Videos</Typography>
							{videos.map((video, i) => (
								<Video key={i} video={apiToVideo(video)} />
							))}
							<Divider sx={{ my: 4 }} />
						</>
					)}
				</Container>
			</Layout>
		</>
	);
};

export default Results;
