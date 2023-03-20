/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path');
const withLess = require('next-with-less');
const withTM = require('next-transpile-modules')([
    '@arco-design/web-react',
    '@arco-themes/react-arco-pro',
]);

const setting = require('./src/settings.json');

module.exports = withLess(
    withTM({
        lessLoaderOptions: {
            lessOptions: {
                modifyVars: {
                    'arcoblue-6': setting.themeColor,
                },
            },
        },
        webpack: (config) => {
            config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            });

            config.resolve.alias['@/assets'] = path.resolve(
                __dirname,
                './src/public/assets'
            );
            config.resolve.alias['@'] = path.resolve(__dirname, './src');

            return config;
        },
        async redirects() {
            return [
                {
                    source: '/',
                    destination: '/visualization/multi-dimension-data-analysis',
                    permanent: true,
                },
            ];
        },
        pageExtensions: ['tsx'],
        env: {
            NEXT_APP_API_URL: process.env.NEXT_APP_API_URL,
        },
        // next.config.js
        async rewrites() {
            return [
                {
                    source: '/api/v1/:path*',
                    destination: 'http://35.155.204.225:3004/api/v1/:path*',
                },
            ];
        },
        images: {
            unoptimized: true,
        },
        // serverDependenciesToBundle: [
        //     // "recharts",
        //     // "d3-shape",
        //     // "d3-scale",
        //     // "d3-path",
        //     // "d3-array",
        //     // "d3-time",
        //     // "d3-format",
        //     // "d3-interpolate",
        //     // "d3-time-format",
        //     "d3-color",
        //     // "internmap",
        // ],
    })
);
