import Head from 'next/head';
import Table from '../components/table/PinyinTable';
import { useState } from 'react';
import { SyllableGroup } from '../components/data/syllables';
import SyllableGroupModal from '../components/syllableGroupModal';
import SettingsProvider from '../components/settings/settingsProvider';


function HomePage() {
  const [syllableGroup, setSyllableGroup] = useState<SyllableGroup | undefined>()

  return (
      <>
        <Head>
          <title>Pinyin</title>
          <meta name="description" content="Pinyin Tool" />
        </Head>
        <SettingsProvider>
          <SyllableGroupModal 
            syllableGroup={syllableGroup}
            setSyllableGroup={setSyllableGroup}
          />
          <Table 
            setSyllableGroup={setSyllableGroup}
          />
        </SettingsProvider>
      </>
  );
}

export default HomePage