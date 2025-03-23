import type { Metadata, Viewport } from "next";

import "./globals.css";

import { Elements } from "./elements";
import { Providers } from "./providers";

import { Component } from "@/typings/component";

const APP_NAME = "MaterialTube client";
const APP_DEFAULT_TITLE = "MaterialTube";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION =
	"MaterialTube is a beautiful and elegant web client for Invidious servers, built using Next.js and HeroUI.";

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE
	},
	description: APP_DESCRIPTION,
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_DEFAULT_TITLE
	},
	formatDetection: {
		telephone: false
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE
		},
		description: APP_DESCRIPTION
	},
	twitter: {
		card: "summary",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE
		},
		description: APP_DESCRIPTION
	}
};

export const viewport: Viewport = {
	themeColor: "#FFFFFF"
};

const RootLayout: Component = ({ children }) => (
	<html className="dark" lang="en">
		<body>
			<Providers>
				<Elements>{children}</Elements>
			</Providers>
		</body>
	</html>
);

export default RootLayout;
