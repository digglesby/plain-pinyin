// context.js
import { createContext } from 'react';
import { Syllable, SyllableData, SyllableGroup } from '../data/syllables';
import { TableData } from '../data/buildTable';

export type State = {
    settings: {
        volume: number,
        playbackSpeed: number,
        useTrad: boolean,
        setVolume: (v: number) => void,
        setPlaybackSpeed: (v: number) => void,
        setUseTrad: (v: boolean) => void
    },
    syllables: {
        loading: boolean,
        err: undefined | Error,
        syllables: SyllableData,
        tableData: TableData,
        reload: () => void,
        selectedSyllableGroup: SyllableGroup | undefined,
        setSelectedSyllableGroup: (v: SyllableGroup | string | undefined) => void
    }
    quiz: {
        sounds?: Syllable[],
        options?: Syllable[][],
        answers?: Syllable[],
        setSounds(v: Syllable[]),
        answerQuestion(i: number, v: Syllable)
    }
}

export const Context = createContext<State>({
    settings: {
        volume: 1.0,
        playbackSpeed: 1.0,
        useTrad: false,
        setVolume: (v: number) => {},
        setPlaybackSpeed: (v: number) => {},
        setUseTrad: (v: boolean) => {},
    },
    syllables: {
        loading: true,
        err: undefined,
        syllables: {
            syllableArray: [],
            syllableGroupMap: {}
        },
        tableData: [], 
        reload: () => {},
        selectedSyllableGroup: undefined,
        setSelectedSyllableGroup: (v: SyllableGroup) => {}
    },
    quiz: {
        setSounds: (v: Syllable[]) => {},
        answerQuestion: (i: number, v: Syllable) => {}
    }
});