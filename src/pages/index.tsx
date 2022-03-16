import { NextSeo } from "next-seo";

import Title from "@components/Title";

import { NextPage } from "next";

const Index: NextPage = () => (
	<>
		<NextSeo title="Hello World" />
		<Title />
	</>
);

export default Index;
