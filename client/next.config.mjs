/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'storage-ct.lrclib.net',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'storagect.lrclib.net',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
