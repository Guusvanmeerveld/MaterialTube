import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Component } from "@/typings/component";

export const metadata: Metadata = {
	title: "MaterialTube client",
	description:
		"MaterialTube is a beautiful and elegant web client for Invidious servers, built using Next.js and NextUI.",
	applicationName: "MaterialTube"
};

const RootLayout: Component = ({ children }) => {
	return (
		<html lang="en" className="dark">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
