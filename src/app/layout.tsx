import { Metadata } from "next";
import "./globals.css";
import { obviouslyNarrow, satoshi } from "./fonts";

export const metadata: Metadata = {
  title: 'ZunoPay',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
  openGraph: {
    type: 'website',
    title: 'ZunoPay',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'ZunoPay',
  },
  appleWebApp: {
    title: 'ZunoPay',
    startupImage: '/assets/apple-touch-icon.png',
  },
  twitter: {
    title: 'ZunoPay',
    site: '@ZunoPay',
    images: '/assets/images/metadata/metadata-logo.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en">
      <body className={`${satoshi.className} ${obviouslyNarrow.variable}`}>
        {children}
      </body>
    </html>
  )
}
