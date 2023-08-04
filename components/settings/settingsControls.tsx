import { useContext, useState } from "react";
import { Context } from "../state/stateContext";


const SettingControls = () => {
    const { settings } = useContext(Context);
    const [open, setOpen] = useState<null | 'vol' | 'speed'>(null);
    
    const speedSlider = (
        <input 
            onSelect={() => setOpen('speed')}
            onBlur={() => setOpen(null)}
            type='range' 
            value={settings.playbackSpeed} 
            onChange={
                (e) => settings.setPlaybackSpeed(parseFloat(e.target.value))
            } 
            min={0.5} 
            max={2.5} 
            step={0.5}>
        </input>
    )

    const volumeSlider = (
        <input
            onSelect={() => setOpen('vol')}
            onBlur={() => setOpen(null)}
            type='range' 
            value={settings.volume} 
            onChange={
                (e) => settings.setVolume(parseFloat(e.target.value))
            } 
            min={0} 
            max={1} 
            step={0.05}
        />
    )

    return (
        <div className="settings-controls" onMouseLeave={() => {
            setOpen(null)
        }}>
            <div className="top-row">
                <button
                    className="mobile dropdown-button"
                    onClick={() => setOpen('vol')}
                    type="button"
                >
                    <span className="material-symbols-outlined">settings</span>
                </button>

                <div className={`slider-group desktop ${(open == 'speed') ? 'open' : ''}`}>
                    <button type="button" 
                        onMouseOver={() => setOpen('speed')} className="playback-speed"
                    >
                        {settings.playbackSpeed.toFixed(1)}x
                    </button>
                    {speedSlider}
                </div>

                <div className={`slider-group desktop ${(open == 'vol') ? 'open' : ''}`}>
                    <button type="button" onMouseOver={() => setOpen('vol')} className="volume"><span className="material-symbols-outlined">volume_up</span></button>
                    {volumeSlider}
                </div>

                <div className="spacer"></div>

                <button
                    className="use-trad"
                    onClick={() => settings.setUseTrad(!settings.useTrad)}
                    type="button"
                >
                    {(settings.useTrad) ? '寫字' : '写字'}
                </button>
            </div>

            <div className={`dropdown ${(open != null) ? 'open' : ''}`}>
                <div className={`slider-group mobile`}>
                    <label>
                        {settings.playbackSpeed.toFixed(1)}x
                    </label>
                    {speedSlider}
                </div>

                <div className={`slider-group mobile`}>
                    <label>
                        <span className="material-symbols-outlined">volume_up</span>
                    </label>
                    {volumeSlider}
                </div>
            </div>
        </div>
    )
}

export default SettingControls