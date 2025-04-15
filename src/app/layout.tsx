import "./globals.css";


export const metadata = {
  title: 'Zunopay',
  description: 'Pay with stablecoins',
  themeColor: '#6B46C1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#6B46C1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
