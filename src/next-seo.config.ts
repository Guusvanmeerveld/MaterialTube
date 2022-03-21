import packageInfo from "../package.json";

import type { DefaultSeoProps } from "next-seo";

const SEO: DefaultSeoProps = {
	titleTemplate: `%s | ${packageInfo.displayName}`,
	defaultTitle: packageInfo.displayName,
	description: "This is a NextJS template."
};

export default SEO;
