import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Context, State } from './stateContext';
import useSettings from './useSettings';
import useSyllables from './useSyllables';
import useSelectedSyllableGroup from './useSelectedSyllableGroup';

type Props = {
  children: ReactNode
}

const StateProvider = (props: Props) => {
  const [volume, playbackSpeed, useTrad, setVolume, setPlaybackSpeed, setUseTrad] = useSettings()
  const [loading, err, syllables, tableData, reload] = useSyllables()
  const [selectedSyllableGroup, setSelectedSyllableGroup] = useSelectedSyllableGroup(tableData)

  const state: State = useMemo(
    (): State => {
      return {
        settings: { 
          volume, 
          playbackSpeed, 
          useTrad, 
          setVolume, 
          setPlaybackSpeed, 
          setUseTrad
        },
        syllables: {
          loading, 
          err, 
          syllables, 
          tableData,
          selectedSyllableGroup,
          setSelectedSyllableGroup,
          reload
        }
      }
    }, 
    [volume, playbackSpeed, useTrad, loading, err, syllables, tableData, selectedSyllableGroup]
  );

  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}

export default StateProvider