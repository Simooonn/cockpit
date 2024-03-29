/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path')
const withLess = require('next-with-less')
const withTM = require('next-transpile-modules')([
    '@arco-design/web-react',
    '@arco-themes/react-arco-pro',
])

const setting = require('./src/settings.json')

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
                use: [ '@svgr/webpack' ],
            })

            config.resolve.alias['@/assets'] = path.resolve(
                __dirname,
                './src/public/assets'
            )
            config.resolve.alias['@'] = path.resolve(__dirname, './src')

            return config
        },
        // async redirects() {
        //   return [
        //     {
        //       source: '/',
        //       destination: '/dashboard',
        //       permanent: true,
        //     },
        //   ];
        // },
        pageExtensions: [ 'tsx' ],
        env: {
            NEXT_APP_API_URL: process.env.NEXT_APP_API_URL,
            NEXT_GOOGLE_MAP_API_KEY: process.env.NEXT_GOOGLE_MAP_API_KEY,
        },
        // next.config.js
        async rewrites() {
            return [
                {
                    source: '/v1/admin/:path*',
                    // destination: 'http://192.168.50.219:8020/v1/admin/:path*',
                    // destination: 'https://apidev.metablox.io/v1/admin/:path*',
                    // destination: 'https://apitest.metablox.io/v1/admin/:path*',
                    destination: 'https://apistage.metablox.io/v1/admin/:path*',
                    // destination: 'https://api.metablox.io/v1/admin/:path*',

                },
                // {
                //   source: '/v1/admin/:path*',
                //   destination: 'http://dev.lingcoder.com/v1/admin/:path*',
                // },
            ]
        },
        images: {
            unoptimized: true,
        },
    })
)
