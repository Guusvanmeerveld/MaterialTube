import axios, { AxiosError } from "axios";

import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { useState } from "react";

import { useQuery } from "react-query";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { Error } from "@interfaces/api";
import {
	Trending as TrendingModel,
	Video as VideoModel
} from "@interfaces/video";

import { trendingToVideo } from "@utils/conversions";

import Layout from "@components/Layout";
import Grid from "@components/Video/Grid";

const Trending: NextPage = () => {
	const [selectedCategory, setCategory] = useState<string | undefined>();

	const { isLoading, error, data } = useQuery<
		TrendingModel[],
		AxiosError<Error>
	>(
		"trendingData",
		() =>
			axios
				.get("https://invidious.privacy.gd/api/v1/trending", {
					params: {
						fields: [
							"title",
							"description",
							"descriptionHtml",
							"videoId",
							"author",
							"authorId",
							"authorUrl",
							"lengthSeconds",
							"published",
							"publishedText",
							"viewCount",
							"videoThumbnails"
						].join(","),
						type: selectedCategory
					}
				})
				.then((res) => res.data),
		{
			retry: 5,
			retryDelay: 5000
		}
	);

	return (
		<>
			<NextSeo title="Trending" />
			<Layout>
				<Box sx={{ px: { xs: 1, sm: 2, md: 5 } }}>
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
						<>
							<Box sx={{ my: 2 }}>
								<Typography sx={{ display: "inline-block", mr: 1 }}>
									Categories:
								</Typography>
								{["Music", "Gaming", "News", "Movies"].map((category) => {
									const name = category.toLowerCase();
									const isSelected = name == selectedCategory;

									return (
										<Chip
											sx={{ mr: 1 }}
											key={category}
											color={isSelected ? "primary" : "default"}
											label={category}
											onClick={() => setCategory(isSelected ? undefined : name)}
										/>
									);
								})}
							</Box>
							<Grid videos={data.map(trendingToVideo)} />
						</>
					)}
				</Box>
			</Layout>
		</>
	);
};

export default Trending;
