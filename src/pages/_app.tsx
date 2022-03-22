import SEO from "../next-seo.config";

import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

import { useMemo } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import createTheme from "@src/theme";

import "@styles/globals.sass";

const queryClient = new QueryClient();

const cache = createCache({ key: "next" });

const App = ({ Component, pageProps }: AppProps) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = useMemo(() => createTheme(prefersDarkMode), [prefersDarkMode]);

	return (
		<CacheProvider value={cache}>
			<QueryClientProvider client={queryClient}>
				{process.env.NODE_ENV != "production" && (
					<ReactQueryDevtools initialIsOpen={true} />
				)}
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<DefaultSeo {...SEO} />
					<Component {...pageProps} />
				</ThemeProvider>
			</QueryClientProvider>
		</CacheProvider>
	);
};

export default App;
