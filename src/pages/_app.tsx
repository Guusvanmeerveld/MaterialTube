import "@styles/globals.scss";

import SEO from "../next-seo.config";

import { DefaultSeo } from "next-seo";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
	<>
		<DefaultSeo {...SEO} />
		<Component {...pageProps} />
	</>
);

export default App;
