import Head from 'next/head';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import '../styles/main.scss'
import StateProvider from '../components/state/stateProvider';

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <div className='container'>
        <Header />
        <Component />
      </div>
      <Footer />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </StateProvider>
  );
}

export default MyApp