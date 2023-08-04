import Head from 'next/head';
import Table from '../components/table/PinyinTable';
import { useState } from 'react';
import { SyllableGroup } from '../components/data/syllables';
import SyllableGroupModal from '../components/syllableGroupModal';
import StateProvider from '../components/state/stateProvider';
import About from '../components/about/about';


function HomePage() {

  return (
      <>
        <Head>
          <title>Pinyin</title>
          <meta name="description" content="Pinyin Tool" />
        </Head>
        <SyllableGroupModal />
        <Table />
        <About />
      </>
  );
}

export default HomePage