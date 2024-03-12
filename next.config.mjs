import createPWA from "next-pwa";

const withPWA = createPWA({
	dest: "public"
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
