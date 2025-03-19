import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
	// Note: This is only an example. If you use Pages Router,
	// use something else that works, such as "service-worker/index.ts".
	swSrc: "src/sw.ts",
	swDest: "public/sw.js"
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withSerwist(nextConfig);
