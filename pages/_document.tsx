import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full w-full m-0" lang="en">
      <Head />
      <body className="h-full w-full m-0 overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
