import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";

import { useState } from "react";

import { useQuery } from "react-query";

import axios, { AxiosError } from "axios";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { Error } from "@interfaces/api";
import VideoTrending from "@interfaces/api/trending";

import { apiToVideo } from "@utils/conversions";
import useSettings from "@utils/hooks/useSettings";

import Layout from "@components/Layout";
import Loading from "@components/Loading";
import Grid from "@components/Video/Grid";

const fetchTrending = (server: string, category: string) =>
	axios
		.get(`https://${server}/api/v1/trending`, {
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
					"liveNow",
					"premium",
					"isUpcoming",
					"viewCount",
					"videoThumbnails"
				].join(","),
				type: category
			}
		})
		.then((res) => res.data);

const Trending: NextPage<{ trending: VideoTrending[] }> = (props) => {
	const [selectedCategory, setCategory] = useState("all");

	const [settings] = useSettings();

	const { isLoading, error, data, isFetching } = useQuery<
		VideoTrending[],
		AxiosError<Error>
	>(
		["trendingData", selectedCategory],
		() => fetchTrending(settings.invidiousServer, selectedCategory),
		{
			initialData: props.trending
		}
	);

	return (
		<>
			<NextSeo
				title="Trending"
				description="Look at new and trending video's"
			/>
			<Layout>
				<Box sx={{ px: { xs: 1, sm: 2, md: 5 } }}>
					{isLoading && <Loading />}
					{error && <Box>{error.response?.data.error}</Box>}
					{!isLoading && !error && data && (
						<>
							<Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
								<Typography sx={{ mr: 1 }}>Categories:</Typography>
								{["Music", "Gaming", "News", "Movies"].map((category) => {
									const name = category.toLowerCase();
									const isSelected = name == selectedCategory;

									return (
										<Chip
											sx={{ mr: 1 }}
											key={category}
											color={isSelected ? "primary" : "default"}
											label={category}
											onClick={() => {
												setCategory(isSelected ? "all" : name);
											}}
										/>
									);
								})}
								{isFetching && <CircularProgress size={25} />}
							</Box>
							<Grid videos={data.map(apiToVideo)} />
						</>
					)}
				</Box>
			</Layout>
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({}) => {
	const trending = await fetchTrending(
		process.env.NEXT_PUBLIC_DEFAULT_SERVER as string,
		"all"
	);

	return {
		props: { trending: trending.slice(0, 10) },
		revalidate: 30
	};
};

export default Trending;
