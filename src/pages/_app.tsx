import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

import { useMemo } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import SEO from "@src/next-seo.config";
import createTheme from "@src/theme";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { refetchOnWindowFocus: false, retry: 5, retryDelay: 5000 }
	}
});

const App = ({ Component, pageProps }: AppProps) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = useMemo(() => createTheme(prefersDarkMode), [prefersDarkMode]);

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
