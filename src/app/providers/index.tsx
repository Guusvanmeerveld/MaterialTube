"use client";

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ContextMenuProvider } from "./ContextMenuProvider";

import { Component } from "@/typings/component";

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: false } }
});

export const Providers: Component = ({ children }) => (
	<QueryClientProvider client={queryClient}>
		<ReactQueryDevtools initialIsOpen={false} />
		<HeroUIProvider>
			<ContextMenuProvider>{children}</ContextMenuProvider>
		</HeroUIProvider>
	</QueryClientProvider>
);
