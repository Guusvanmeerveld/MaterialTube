// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
	reactStrictMode: true,
	experimental: {
		emotion: true
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	basePath: process.env.CI == "true" ? "/MaterialTube" : "",
	trailingSlash: true
};
