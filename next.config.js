// module.exports = {
//   images: {
//     domains: ["devhong-s3.s3.ap-northeast-2.amazonaws.com"],
//   },
// };

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})