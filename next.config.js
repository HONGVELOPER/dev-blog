module.exports = {
	images: {
		domains: ["devhong-s3.s3.ap-northeast-2.amazonaws.com"],
	},
	reactStrictMode: true,
	async rewrites() {
		if (process.env.NODE_ENV !== "production") {
			return [
				{
					source: process.env.SOURCE_PATH,
					destination: process.env.DESTINATION_URL,
				},
			];
		} else if (process.env.NODE_ENV === "production") {
			return [
				{
					source: process.env.SOURCE_PATH,
					destination: process.env.DESTINATION_URL,
				},
			];
		}
	},
};
