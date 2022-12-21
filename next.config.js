/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
    ],
  },
  output: 'standalone',
  experimental: { appDir: true },
  reactStrictMode: false,
}
