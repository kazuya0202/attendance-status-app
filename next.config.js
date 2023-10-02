/** @type {import('next').NextConfig} */

const withPWAInit = require("next-pwa");

const withPWA = withPWAInit({
    dest: "out",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});


const nextConfig = withPWA({
    output: "export",
    trailingSlash: true,
    reactStrictMode: true,
});

module.exports = nextConfig;
