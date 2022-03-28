import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

import { useMemo } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import "@src/globals.css";
import SEO from "@src/next-seo.config";
import createTheme from "@src/theme";

import { useSettings } from "@utils/hooks";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { refetchOnWindowFocus: false, retry: 5, retryDelay: 5000 }
	}
});

const App = ({ Component, pageProps }: AppProps) => {
	const [settings] = useSettings();

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	let dark: boolean;

	if (settings.theme) {
		if (settings.theme == "dark") dark = true;
		else dark = false;
	} else {
		dark = prefersDarkMode;
	}

	const theme = useMemo(() => createTheme(settings, dark), [settings, dark]);

	return (
		<QueryClientProvider client={queryClient}>
			{process.env.NODE_ENV != "production" && (
				<ReactQueryDevtools initialIsOpen={false} />
			)}
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<DefaultSeo {...SEO} />
				<Component {...pageProps} />
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
