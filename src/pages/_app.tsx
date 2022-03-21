import { FC, useMemo } from "react";

import { DefaultSeo } from "next-seo";

import type { AppProps } from "next/app";

import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider } from "@mui/material/styles";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import SEO from "../next-seo.config";

import "@styles/globals.sass";

import createTheme from "@src/theme";

const cache = createCache({ key: "next" });

const App = ({ Component, pageProps }: AppProps) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = useMemo(() => createTheme(prefersDarkMode), [prefersDarkMode]);

	return (
		<CacheProvider value={cache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<DefaultSeo {...SEO} />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	);
};

export default App;
