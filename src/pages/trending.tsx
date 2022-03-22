import axios, { AxiosError } from "axios";

import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { useQuery } from "react-query";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { Error } from "@interfaces/api";
import {
	Trending as TrendingModel,
	Video as VideoModel
} from "@interfaces/video";

import { trendingToVideo } from "@utils/conversions";

import Layout from "@components/Layout";
import Grid from "@components/Video/Grid";

const Trending: NextPage = () => {
	const { isLoading, error, data } = useQuery<
		TrendingModel[],
		AxiosError<Error>
	>(
		"trendingData",
		() =>
			axios("https://invidious.privacy.gd/api/v1/trending").then(
				(res) => res.data
			),
		{
			retry: 5,
			retryDelay: 5000
		}
	);

	return (
		<>
			<NextSeo title="Trending" />
			<Layout>
				<Box sx={{ padding: { xs: 2, md: 5 } }}>
					{isLoading && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<CircularProgress />
						</Box>
					)}
					{error && <Box>{error.response?.data.error}</Box>}
					{!isLoading && !error && data && (
						<Grid videos={data.map(trendingToVideo)} />
					)}
				</Box>
			</Layout>
		</>
	);
};

export default Trending;
