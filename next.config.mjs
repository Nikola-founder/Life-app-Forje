/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // --- Performance & security additions ---
  // gzip/brotli compress responses.
  compress: true,
  // Don't advertise the framework in response headers.
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Baseline security headers on every route.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Generated icon/manifest files are static and safe to cache hard.
        source: "/(icon.png|apple-icon.png|manifest.webmanifest)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
