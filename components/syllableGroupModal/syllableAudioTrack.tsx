import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../settings/settingsContext"

type Props = {
    audioTrack: string,
    title: string
}

const SyllableAudioTrack = (props: Props) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(new Audio(props.audioTrack))
    const {volume, playbackSpeed} = useContext(Context)

    useEffect(() => {
        audioRef.current.onended = () => {
            setIsPlaying(false)
        }
    }, [])

    useEffect(() => {
        audioRef.current.playbackRate = playbackSpeed
        audioRef.current.volume = volume
    },[volume, playbackSpeed])

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.currentTime = 0
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const PlayButton = (!isPlaying) ?
        (
            <button onClick={() => setIsPlaying(true)}>
                <span className="material-symbols-rounded">play_circle</span>
            </button>
        ) : (
            <button onClick={() => setIsPlaying(false)}>
                <span className="material-symbols-rounded">stop_circle</span>
            </button>
        )

    return (<div>
        <p>
            {props.title}
            {PlayButton}
        </p>
    </div>)
}

export default SyllableAudioTrack