/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cloud.appwrite.io",
				pathname: "/v1/storage/buckets/664f301d002468228ba2/files/**",
			},
		],
	},
};

export default nextConfig;
