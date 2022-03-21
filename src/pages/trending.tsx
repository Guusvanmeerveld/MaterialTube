import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Box from "@mui/material/Box";

import { Video as VideoModel } from "@interfaces/video";

import Layout from "@components/Layout";
import Grid from "@components/Video/Grid";

const exampleVideo = {
	title: "Yeet",
	description: "Yarr",
	id: Math.random().toString(),
	thumbnail: "https://invidious.privacy.gd/vi/qF1DTK4U1AM/maxresdefault.jpg"
};

const videos: VideoModel[] = [
	exampleVideo,
	exampleVideo,
	exampleVideo,
	exampleVideo,
	exampleVideo
];

const Trending: NextPage = () => {
	return (
		<>
			<NextSeo title="Trending" />
			<Layout>
				<Box sx={{ padding: { xs: 2, md: 5 } }}>
					<Grid videos={videos} />
				</Box>
			</Layout>
		</>
	);
};

export default Trending;
