// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	basePath: process.env.CI == "true" ? "/MaterialTube" : "",
	trailingSlash: true
};
