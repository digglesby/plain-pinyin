import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../state/stateContext"

type Props = {
    audioTrack: string
}

const AudioPlayer = (props: Props) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(new Audio(props.audioTrack))
    const {settings} = useContext(Context)

    useEffect(() => {
        audioRef.current.onended = () => {
            setIsPlaying(false)
        }
    }, [])

    useEffect(() => {
        audioRef.current.playbackRate = settings.playbackSpeed
        audioRef.current.volume = settings.volume
    },[settings.volume, settings.playbackSpeed])

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.currentTime = 0
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current = new Audio(props.audioTrack)
        audioRef.current.onended = () => {
            setIsPlaying(false)
        }
        
    },[props.audioTrack])

    const PlayButton = (!isPlaying) ?
        (
            <button className="audio-player" type="button" onClick={() => setIsPlaying(true)}>
                <span className="material-symbols-outlined">play_circle</span>
            </button>
        ) : (
            <button className="audio-player" type="button" onClick={() => setIsPlaying(false)}>
                <span className="material-symbols-outlined">stop_circle</span>
            </button>
        )

    return PlayButton
}

export default AudioPlayer