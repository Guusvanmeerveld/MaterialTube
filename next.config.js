// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	env: {
		NEXT_PUBLIC_GITHUB_URL: "https://github.com/Guusvanmeerveld/MaterialTube"
	},
	basePath: process.env.BASE_PATH ?? "",
	trailingSlash: true
};
