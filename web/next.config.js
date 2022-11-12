const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@daydream/common']);

module.exports = withPlugins([withTM], {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["sbleaping.s3.us-east-1.amazonaws.com", "d1o142gmp3aap9.cloudfront.net"],
  }
});
