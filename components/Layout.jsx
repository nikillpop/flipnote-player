import '../assets/styles/main.scss';

import { connect } from "react-redux";
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default connect()((props) => (
  <div className="app">
    <Head>
      <title>Flipnote Player</title>
      <meta charSet="utf-8"/>
      <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="application-name" content={ process.env.META_NAME }/>
      <meta name="description" content={ process.env.META_DESCRIPTION }/>
      <meta property="og:url" content={ process.env.META_URL }/>
      <meta property="og:type" content="website"/>
      <meta property="og:title" content={ process.env.META_NAME }/>
      <meta property="og:image" content={ process.env.META_SOCIAL_IMAGE_URL }/>
      <meta property="og:image:width" content={ process.env.META_SOCIAL_IMAGE_WIDTH }/>
      <meta property="og:image:height" content={ process.env.META_SOCIAL_IMAGE_HEIGHT }/>
      <meta property="og:description" content={ process.env.META_DESCRIPTION }/>
      <meta property="og:site_name" content={ process.env.META_SITE_NAME }/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:creator" content={ process.env.META_CREATOR_TWITTER }/>
      <link rel="shortcut icon" href="/favicon.ico"/>
    </Head>
    <Header/>
    <main className="Content">
      { props.foo }
      { props.children }
    </main>
    <Footer/>
  </div>
));