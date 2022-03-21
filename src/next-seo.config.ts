import type { DefaultSeoProps } from "next-seo";

import packageInfo from "../package.json";

const SEO: DefaultSeoProps = {
	titleTemplate: `%s | ${packageInfo.displayName}`,
	defaultTitle: packageInfo.displayName,
	description: "This is a NextJS template."
};

export default SEO;
