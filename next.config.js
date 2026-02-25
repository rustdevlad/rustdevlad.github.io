/** @type {import('next').NextConfig} */

// ============================================================
// GITHUB PAGES (текущий режим)
// output: 'export' — статическая генерация, нет сервера
// ============================================================

// ============================================================
// VDS / САМОСТОЯТЕЛЬНЫЙ СЕРВЕР (раскомментировать когда нужно)
// Удалить строку output: 'export' ниже
// Запускать: npm run build && npm run start
// Или через PM2: pm2 start npm --name "portfolio" -- start
// Nginx проксирует на localhost:3000
// ============================================================

const nextConfig = {
  output: 'export', // GITHUB PAGES: убрать эту строку при переезде на VDS
  images: {
    unoptimized: true, // GITHUB PAGES: на VDS можно убрать для оптимизации изображений
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
        pathname: '/steam/**'
      },
      {
        protocol: 'https',
        hostname: 'is*.mzstatic.com',
        pathname: '/**'
      }
    ]
  },
}

module.exports = nextConfig