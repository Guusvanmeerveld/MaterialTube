import "@styles/globals.scss";

import SEO from "../next-seo.config";

import { DefaultSeo } from "next-seo";

import type { AppProps } from "next/app";
import Script from "next/script";

import "@styles/materialize/materialize.scss";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
	<>
		<Script src="/static/scripts/materialize.min.js"></Script>
		<DefaultSeo {...SEO} />
		<Component {...pageProps} />
	</>
);

export default App;
