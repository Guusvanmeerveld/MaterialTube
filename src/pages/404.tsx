import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Layout from "@components/Layout";

const NotFound: NextPage = () => {
	return (
		<>
			<NextSeo
				title="Not Found"
				description="The page may have been moved or deleted"
			/>
			<Layout>
				<Box sx={{ mt: 5, textAlign: "center" }}>
					<Typography variant="h3">
						Page not found
					</Typography>
					<Typography variant="h4">
						The page may have been moved or
						deleted.
					</Typography>
				</Box>
			</Layout>
		</>
	);
};

export default NotFound;
