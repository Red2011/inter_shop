import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-screen" lang="en">
      <Head />
      <body className="h-screen bg-gradient-to-bl from-green-300 to-fuchsia-600 bg-fixed">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
