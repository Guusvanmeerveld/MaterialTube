import packageInfo from "../package.json";

import type { DefaultSeoProps } from "next-seo";

const SEO: DefaultSeoProps = {
	titleTemplate: `%s | ${packageInfo.displayName}`,
	defaultTitle: packageInfo.displayName,
	description: packageInfo.description,
	openGraph: {
		description: packageInfo.displayName,
		site_name: packageInfo.displayName
	}
};

export default SEO;
