import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { useQuery } from "react-query";

import Box from "@mui/material/Box";

import { Typography } from "@mui/material";

import {
	Trending as TrendingModel,
	Video as VideoModel
} from "@interfaces/video";

import { trendingToVideo } from "@utils/conversions";

import Layout from "@components/Layout";
import Grid from "@components/Video/Grid";

const Trending: NextPage = () => {
	const { isLoading, error, data } = useQuery<TrendingModel[]>(
		"trendingData",
		() =>
			fetch("https://invidious.privacy.gd/api/v1/trending").then((res) =>
				res.json()
			)
	);

	return (
		<>
			<NextSeo title="Trending" />
			<Layout>
				<Box sx={{ padding: { xs: 2, md: 5 } }}>
					{isLoading && <Typography variant="h3">Loading</Typography>}
					{!isLoading && !error && data && (
						<Grid videos={data.map(trendingToVideo)} />
					)}
				</Box>
			</Layout>
		</>
	);
};

export default Trending;
