import '../styles/main.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
    </>
  );
}

export default MyApp