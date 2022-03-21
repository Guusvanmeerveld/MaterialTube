import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Layout from "@components/Layout";

const Index: NextPage = () => (
	<>
		<NextSeo title="Home" />
		<Layout></Layout>
	</>
);

export default Index;
