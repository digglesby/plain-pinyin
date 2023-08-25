import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Context, State } from './stateContext';
import useSettings from './useSettings';
import useSyllables from './useSyllables';
import useSelectedSyllableGroup from './useSelectedSyllableGroup';
import useQuiz from './useQuiz';

type Props = {
  children: ReactNode
}

const StateProvider = (props: Props) => {
  const [volume, playbackSpeed, useTrad, setVolume, setPlaybackSpeed, setUseTrad] = useSettings()
  const [loading, err, syllables, tableData, reload] = useSyllables()
  const [selectedSyllableGroup, setSelectedSyllableGroup] = useSelectedSyllableGroup(syllables)
  const [sounds, options, answers, setSounds, answerQuestion] = useQuiz(syllables)

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
        },
        quiz: {
          sounds,
          options,
          answers,
          setSounds,
          answerQuestion
        }
      }
    }, 
    [volume, playbackSpeed, useTrad, loading, err, syllables, tableData, selectedSyllableGroup, sounds, answers]
  );

  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}

export default StateProvider