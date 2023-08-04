import { useEffect, useState } from 'react';

const useSettings = (): [
    number, 
    number, 
    boolean, 
    (v: number) => void, 
    (v: number) => void, 
    (v:boolean) => void
] => {
  const [volume, setVolume] = useState(1.0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0)
  const [useTrad, setUseTrad] = useState(false)

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

  return [volume, playbackSpeed, useTrad, setVolume, setPlaybackSpeed, setUseTrad]
}

export default useSettings