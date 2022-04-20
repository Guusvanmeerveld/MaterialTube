import NotFound from "./404";

import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { FC, useState } from "react";

import { useQuery } from "react-query";

import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import Add from "@mui/icons-material/Add";

import Result, {
	CategoryResult,
	ChannelResult,
	PlaylistResult,
	VideoResult
} from "@interfaces/api/search";

import { apiToVideo } from "@utils/conversions";
import useSettings from "@utils/hooks/useSettings";

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

	const Category: FC<{ category: CategoryResult }> = ({ category }) => {
		const initialCount = 3;

		const [count, setCount] = useState(initialCount);

		const shownVideos = category.contents.slice(0, count);

		return (
			<>
				<Typography variant="h5">{category.title}</Typography>

				{shownVideos.map((video, i) => (
					<Video video={apiToVideo(video)} key={i} />
				))}

				{category.contents.length > initialCount && (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							mt: 4
						}}
					>
						<Button
							variant="text"
							onClick={() =>
								setCount(
									count > initialCount ? initialCount : category.contents.length
								)
							}
						>
							<Add />
							Show {count > initialCount ? "less" : "more"} (
							{category.contents.length - initialCount})
						</Button>
					</Box>
				)}

				<Divider sx={{ my: 4 }} />
			</>
		);
	};

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

	const categories = data?.filter((result) => result.type == "category") as
		| CategoryResult[]
		| undefined;

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
					{categories && categories.length != 0 && (
						<>
							{categories.map((category, i) => (
								<Category key={i} category={category} />
							))}
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
