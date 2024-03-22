"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ContextMenuProvider } from "./ContextMenuProvider";

export function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } }
	});
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<NextUIProvider>
				<ContextMenuProvider>{children}</ContextMenuProvider>
			</NextUIProvider>
		</QueryClientProvider>
	);
}
