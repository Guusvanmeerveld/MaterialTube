import packageInfo from "../package.json";

import type { DefaultSeoProps } from "next-seo";

const name = process.env.NEXT_PUBLIC_APP_NAME;

const SEO: DefaultSeoProps = {
	titleTemplate: `%s | ${name}`,
	defaultTitle: name,
	description: packageInfo.description,
	openGraph: {
		description: name,
		site_name: name
	}
};

export default SEO;
