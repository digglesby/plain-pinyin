// context.js
import { createContext } from 'react';

export const Context = createContext({
    volume: 1.0,
    playbackSpeed: 1.0,
    useTrad: false,
    setVolume: (v: number) => {},
    setPlaybackSpeed: (v: number) => {},
    setUseTrad: (v: boolean) => {},
});