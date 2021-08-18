import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <script data-ad-client="ca-pub-7427232256160357"
            type='text/javascript'
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}