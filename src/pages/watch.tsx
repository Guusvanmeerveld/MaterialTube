import NotFound from "./404";

import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";

import { useQuery } from "react-query";

import axios, { AxiosError } from "axios";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import Share from "@mui/icons-material/Share";

import { abbreviateNumber } from "@src/utils";

import { Error } from "@interfaces/api";
import VideoAPI from "@interfaces/api/video";

import useSettings from "@utils/hooks/useSettings";

import Layout from "@components/Layout";
import Loading from "@components/Loading";
import Player from "@components/Player";

import styles from "./watch.module.css";

const Watch: NextPage = () => {
	const { query, isReady } = useRouter();

	const theme = useTheme();

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
							sx={{
								height: "75vh",
								margin: "auto",
								mt: 2
							}}
						/>
						<Container sx={{ mt: 2 }}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center"
								}}
							>
								<Box
									sx={{
										flex: 1
									}}
								>
									<Typography variant="h4">{data.title}</Typography>
									<Typography
										variant="subtitle1"
										color={theme.palette.text.secondary}
										sx={{
											mt: 1
										}}
									>
										{abbreviateNumber(data.viewCount)} Views •{" "}
										{new Date(data.published * 1000).toLocaleDateString()}
									</Typography>
								</Box>
								<Share />
							</Box>

							<Divider sx={{ my: 2 }} />

							<Link
								href={{
									pathname: `/channel`,
									query: {
										c: data.authorId
									}
								}}
							>
								<a>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											mb: 2
										}}
									>
										<Avatar
											src={
												data?.authorThumbnails.find(
													(thumbnail) => thumbnail.width == 100
												)?.url
											}
											alt={data.author}
											sx={{
												mr: 2
											}}
										/>
										<Typography variant="h6">{data.author}</Typography>
									</Box>
								</a>
							</Link>

							<Typography
								className={styles.description}
								dangerouslySetInnerHTML={{
									__html: data.descriptionHtml.replaceAll("\n", "<br>")
								}}
							></Typography>
						</Container>
					</>
				)}
			</Layout>
		</>
	);
};

export default Watch;
