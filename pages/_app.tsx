import '../styles/main.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,100,0,0" />
    </>
  );
}

export default MyApp