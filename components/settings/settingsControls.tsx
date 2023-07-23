import { useContext, useState } from "react";
import { Context } from "./settingsContext";


const SettingControls = () => {
    const {volume, setVolume, playbackSpeed, setPlaybackSpeed, useTrad, setUseTrad} = useContext(Context);
    const [open, setOpen] = useState<null | 'vol' | 'speed'>(null);
    

    return (
        <div className="settings-controls" onMouseLeave={() => {
            setOpen(null)
        }}>
            <div className={`slider-group ${(open == 'speed') ? 'open' : ''}`}>
                <button type="button" 
                    onMouseOver={() => setOpen('speed')} className="playback-speed"
                >
                    {playbackSpeed.toFixed(1)}x
                </button>
                <input 
                    onSelect={() => setOpen('speed')}
                    onBlur={() => setOpen(null)}
                    type='range' 
                    value={playbackSpeed} 
                    onChange={
                        (e) => setPlaybackSpeed(parseFloat(e.target.value))
                    } 
                    min={0.5} 
                    max={2.5} 
                    step={0.5}>
                </input>
            </div>
            <div className={`slider-group ${(open == 'vol') ? 'open' : ''}`}>
                <button type="button" onMouseOver={() => setOpen('vol')} className="volume"><span className="material-symbols-outlined">volume_up</span></button>
                <input
                    onSelect={() => setOpen('vol')}
                    onBlur={() => setOpen(null)}
                    type='range' 
                    value={volume} 
                    onChange={
                        (e) => setVolume(parseFloat(e.target.value))
                    } 
                    min={0} 
                    max={1} 
                    step={0.05}
                />
            </div>
            <div className="spacer"></div>
            <button
                className="use-trad"
                onClick={() => setUseTrad(!useTrad)}
                type="button"
            >
                {(useTrad) ? '寫字' : '写字'}
            </button>
        </div>
    )
}

export default SettingControls