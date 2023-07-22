import { useContext } from "react"
import { Syllable } from "../data/syllables"
import SyllableAudioTrack from "./syllableAudioTrack"
import { Context } from "../settings/settingsContext"

type Props = {
    syllable: Syllable
}

const SyllablePlayer = (props: Props) => {
    const {useTrad} = useContext(Context);
    const char = (useTrad) ? props.syllable.traditional_character : props.syllable.simplified_character

    const AudioTracks = props.syllable.file_names.map((name, i) => {
        return (
            <SyllableAudioTrack 
                audioTrack={`/sounds/${props.syllable.pinyin_normalized}/${name}`} 
                key={name}
                title={`Pronunciation ${i+1}`}
            />
        )
    })

    return (
        <div className="syllable-player">
            <h2>{props.syllable.pinyin}<span>{(char == '') ? '\u3000' : char}</span></h2>
            {AudioTracks}
        </div>
    )
}

export default SyllablePlayer