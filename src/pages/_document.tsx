import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// ### n a Next.js application, the _document.js file is used to customize the initial HTML document that is served to the client.
// The Document component from next/document allows you to modify the <html>, <head>, and <body> tags of the rendered HTML document.
