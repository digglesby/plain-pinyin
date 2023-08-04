// context.js
import { createContext } from 'react';
import { Syllable, SyllableGroup } from '../data/syllables';
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
        syllables: Syllable[],
        tableData: TableData,
        reload: () => void,
        selectedSyllableGroup: SyllableGroup | undefined,
        setSelectedSyllableGroup: (v: SyllableGroup | string | undefined) => void
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
        syllables: [],
        tableData: [], 
        reload: () => {},
        selectedSyllableGroup: undefined,
        setSelectedSyllableGroup: (v: SyllableGroup) => {}
    }    
});