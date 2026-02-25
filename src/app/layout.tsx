import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Background } from "@/components/Background"
import Script from 'next/script'
import "./globals.css"
import React from "react";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vladislav - Full Stack Developer",
  description: "Personal portfolio website",
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="prevent-flash" strategy="beforeInteractive">
          {`
            (function() {
              document.documentElement.classList.add('js-loading');
              
              function removeLoadingClass() {
                document.documentElement.classList.remove('js-loading');
              }
              
              // Гарантированный fallback — убираем класс максимум через 300мс
              // Это фикс для GitHub Pages где beforeInteractive может не успеть
              var fallbackTimer = setTimeout(removeLoadingClass, 300);
              
              function removeWithCleanup() {
                clearTimeout(fallbackTimer);
                removeLoadingClass();
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeWithCleanup, { once: true });
              } else {
                // DOM уже готов (статический экспорт часто попадает сюда)
                removeWithCleanup();
              }

              window.addEventListener('load', removeWithCleanup, { once: true });
            })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Background />
          <main className="min-h-screen bg-white dark:bg-black">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}