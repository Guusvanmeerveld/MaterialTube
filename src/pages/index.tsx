import packageInfo from "../../package.json";

import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import PlayCircleOutline from "@mui/icons-material/PlayCircleOutline";

import Layout from "@components/Layout";

const Index: NextPage = () => (
	<>
		<NextSeo title="Home" description={packageInfo.description} />
		<Layout>
			<Box
				sx={{
					textAlign: "center",
					width: { md: "50%", xs: "100%" },
					m: "auto"
				}}
			>
				<PlayCircleOutline sx={{ mt: 2, fontSize: 100 }} />
				<Typography variant="h2" sx={{ my: 1 }}>
					{packageInfo.displayName}
				</Typography>
				<Typography variant="h4" sx={{ my: 1 }}>
					{packageInfo.description}
				</Typography>
				<Box sx={{ mt: 5, display: "flex", justifyContent: "space-evenly" }}>
					<Link passHref href={process.env.NEXT_PUBLIC_GITHUB_URL as string}>
						<Button variant="contained">Check out the docs</Button>
					</Link>
					<Link passHref href="/trending">
						<Button variant="contained">Start watching</Button>
					</Link>
				</Box>
			</Box>
		</Layout>
	</>
);

export default Index;
