import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Context } from './settingsContext';

type Props = {
  children: ReactNode
}

const SettingsProvider = (props: Props) => {
  const [volume, setVolume] = useState(1.0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0)
  const [useTrad, setUseTrad] = useState(false)

  const value = useMemo(
    () => ({ volume, playbackSpeed, useTrad, setVolume, setPlaybackSpeed, setUseTrad }), 
    [volume, playbackSpeed, useTrad]
  );

  useEffect(() => {
      const settingData = window.localStorage.getItem('settings')

      if (settingData) {
          const settingJson = JSON.parse(settingData)

          setVolume(settingJson.volume)
          setPlaybackSpeed(settingJson.playbackSpeed)
          setUseTrad(settingJson.useTrad)
      }
  },[])

  useEffect(() => {
    window.localStorage.setItem('settings', JSON.stringify({
        volume,
        playbackSpeed,
        useTrad
    }))

},[volume, playbackSpeed, useTrad])

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  )
}

export default SettingsProvider