import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Layout from "@components/Layout";
import Title from "@components/Title";

const Index: NextPage = () => (
	<>
		<NextSeo title="Home" />
		<Layout>
			<Title />
		</Layout>
	</>
);

export default Index;
