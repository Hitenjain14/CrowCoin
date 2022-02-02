//@ts-nocheck
import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>CrowdCoin</title>
        <link rel="icon" href="/crowd-coin.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
