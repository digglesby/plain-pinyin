import Head from 'next/head';
import Table from '../components/table/PinyinTable';
import { useState } from 'react';
import { SyllableGroup } from '../components/data/syllables';
import SyllableGroupModal from '../components/syllableGroupModal';
import StateProvider from '../components/state/stateProvider';
import About from '../components/about/about';
import QuizModal from '../components/quizModal/quizModal';


function HomePage() {

  return (
      <>
        <Head>
          <title>Plain Pinyin</title>
          <meta name="description" content="Pinyin Tool" />
        </Head>
        <SyllableGroupModal />
        <QuizModal />
        <Table />
        <About />
      </>
  );
}

export default HomePage