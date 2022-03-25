const packageInfo = require("./package.json");

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
		NEXT_PUBLIC_GITHUB_URL: packageInfo.repository.url,
		NEXT_PUBLIC_APP_NAME: process.env.APP_NAME ?? packageInfo.displayName,
		NEXT_PUBLIC_DEFAULT_SERVER: process.env.DEFAULT_SERVER ?? "vid.puffyan.us"
	},
	basePath: process.env.BASE_PATH ?? "",
	trailingSlash: !(process.env.CI == "true")
};
