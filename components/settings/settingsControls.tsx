import { useContext, useState } from "react";
import { Context } from "../state/stateContext";
import MobileDropdown from "./mobileDropdown";


const SettingControls = () => {
    const { settings } = useContext(Context);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [focused, setFocused] = useState<null | 'vol' | 'speed'>(null);
    
    const speedSlider = (
        <input 
            onSelect={() => setFocused('speed')}
            onBlur={() => setFocused(null)}
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
            onSelect={() => setFocused('vol')}
            onBlur={() => setFocused(null)}
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
            setFocused(null)
        }}>
            <div className="top-row">
                <button
                    className="mobile dropdown-button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    type="button"
                >
                    <span className="material-symbols-outlined">settings</span>
                </button>

                <div className={`slider-group desktop ${(focused == 'speed') ? 'open' : ''}`}>
                    <button 
                        type="button" 
                        onMouseOver={() => setFocused('speed')}
                        onFocus={() => setFocused('speed')}
                        className="playback-speed"
                    >
                        {settings.playbackSpeed.toFixed(1)}x
                    </button>
                    {speedSlider}
                </div>

                <div className={`slider-group desktop ${(focused == 'vol') ? 'open' : ''}`}>
                    <button 
                        type="button" 
                        onMouseOver={() => setFocused('vol')} 
                        onFocus={() => setFocused('vol')}
                        className="volume"
                    >
                        <span className="material-symbols-outlined">volume_up</span>
                    </button>
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

            <MobileDropdown
                isOpen={dropdownOpen}
            >
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
            </MobileDropdown>
        </div>
    )
}

export default SettingControls