import Head from 'next/head';
import Table from '../components/table/PinyinTable';


function HomePage() {
  return (
      <>
        <Head>
          <title>Pinyin</title>
          <meta name="description" content="Pinyin Tool" />
        </Head>
        <Table></Table>
      </>
  );
}

export default HomePage