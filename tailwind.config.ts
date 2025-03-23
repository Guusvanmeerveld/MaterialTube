import { heroui } from "@heroui/react";

import type { Config } from "tailwindcss" with { "resolution-mode": "import" };

const config: Config = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {}
	},
	darkMode: "class",
	plugins: [heroui()]
};

export default config;
